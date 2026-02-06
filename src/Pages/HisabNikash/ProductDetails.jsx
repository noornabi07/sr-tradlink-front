import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlusCircle, FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [kroyweight, setKroyweight] = useState("");
  const [kroyprice, setKroyprice] = useState("");
  const [dailysaleweight, setDailysaleweight] = useState("");
  const [dailysaleprice, setDailysaleprice] = useState("");
  const [product, setProduct] = useState([]);

  const { name } = location.state || {};

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // ===== CALCULATIONS =====
  let totalKroyWeight = 0;
  let totalKroyPrice = 0;
  let totalSaleWeight = 0;
  let totalSalePrice = 0;

  (product.transactions || []).forEach((t) => {
    totalKroyWeight += t.kroyweight;
    totalKroyPrice += t.kroyprice;
    totalSaleWeight += t.dailysaleweight;
    totalSalePrice += t.dailysaleprice;
  });

  const presentStockWeight = (totalKroyWeight - totalSaleWeight);

  // ===== CURRENT MONTH PROFIT =====
  const now = new Date();

  const currentMonthTransactions = (product.transactions || []).filter(t => {
    const d = new Date(t.date);

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  // Calculation
  let monthBuyWeight = 0;
  let monthBuyPrice = 0;
  let monthSellWeight = 0;
  let monthSellPrice = 0;

  currentMonthTransactions.forEach(t => {
    monthBuyWeight += t.kroyweight;
    monthBuyPrice += t.kroyprice;
    monthSellWeight += t.dailysaleweight;
    monthSellPrice += t.dailysaleprice;
  });

  // ===== Determine Buy Rate =====
  let monthAvgBuy;

  // যদি current month এ ক্রয় থাকে
  if (monthBuyWeight > 0) {
    monthAvgBuy = monthBuyPrice / monthBuyWeight;
  } else {
    // যদি current month এ ক্রয় না থাকে, তাহলে last purchase এর rate নিন
    const allTransactions = product.transactions || [];

    // transactions গুলো date অনুযায়ী sort করে latest find করুন
    const lastKroyTransaction = [...allTransactions]
      .filter(t => t.kroyweight > 0)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (lastKroyTransaction) {
      monthAvgBuy = lastKroyTransaction.kroyprice / lastKroyTransaction.kroyweight;
    } else {
      monthAvgBuy = 0; // যদি কোনো previous buy transaction না থাকে
    }
  }

  // Monthly sell rate
  const monthAvgSell = monthSellWeight
    ? monthSellPrice / monthSellWeight
    : 0;

  // Final monthly profit
  const monthlyMunafa = monthSellWeight && monthAvgBuy
    ? Number((monthSellWeight * (monthAvgSell - monthAvgBuy)).toFixed(2))
    : 0;

  // ---------------------------- Top to current month profit



  // ===== SORT TRANSACTIONS BY DATE (LATEST FIRST, DD-MM-YYYY FORMAT) =====
  const sortedTransactions = [...(product.transactions || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Pagination calculations
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  const [editingTransaction, setEditingTransaction] = useState(null);

  // Add transaction handle function
  const handleAddTransaction = () => {
    if (!date || kroyweight === "" || kroyprice === "" || dailysaleweight === "" || dailysaleprice === "") {
      Swal.fire({
        icon: "warning",
        title: "অসম্পূর্ণ তথ্য",
        text: "সব ফিল্ড পূরণ করুন",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    const newTransaction = {
      _id: uuidv4(),
      date,
      kroyweight: Number(kroyweight),
      kroyprice: Number(kroyprice),
      dailysaleweight: Number(dailysaleweight),
      dailysaleprice: Number(dailysaleprice),
    };

    console.log("New Transaction:", newTransaction);

    fetch(`http://localhost:3000/products/${id}/transactions`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(res => res.json())
      .then(() => {
        setProduct(prev => ({
          ...prev,
          transactions: [...(prev?.transactions || []), newTransaction]
        }));
        Swal.fire({
          icon: "success",
          title: "Transaction সফলভাবে যোগ করা হয়েছে",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
        });
      })
    setDate("");
    setKroyweight("");
    setKroyprice("");
    setDailysaleweight("");
    setDailysaleprice("");
    setIsModalOpen(false);
  };

  // Update transaction handle function
  const handleUpdateTransaction = () => {
    const updatedTransaction = {
      ...editingTransaction,
      date,
      kroyweight: Number(kroyweight),
      kroyprice: Number(kroyprice),
      dailysaleweight: Number(dailysaleweight),
      dailysaleprice: Number(dailysaleprice),

    };

    fetch(`http://localhost:3000/products/${id}/transactions/${editingTransaction._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTransaction)
    })
      .then(res => res.json())
      .then(() => {
        setProduct(prev => ({
          ...prev,
          transactions: prev.transactions.map(t =>
            t._id === editingTransaction._id
              ? updatedTransaction
              : t
          )
        }));

        Swal.fire({
          icon: "success",
          title: "লেনদেন আপডেট হয়েছে 🎉",
          timer: 1500,
          showConfirmButton: false
        });

        setIsModalOpen(false);
        setEditingTransaction(null);
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "আপডেট ব্যর্থ হয়েছে",
          text: "দয়া করে আবার চেষ্টা করুন"
        });
      });
  };

  // DELETE tansaction handle function

  const handleDeleteTransaction = (transactionId) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই লেনদেনটি স্থায়ীভাবে মুছে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}/transactions/${transactionId}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(() => {
            // 🔥 UI থেকে সাথে সাথে remove
            setProduct(prev => ({
              ...prev,
              transactions: prev.transactions.filter(
                t => t._id !== transactionId
              )
            }));

            Swal.fire({
              icon: "success",
              title: "লেনদেন মুছে ফেলা হয়েছে",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch(err => {
            console.error(err);
            Swal.fire("Error", "ডিলিট করা যায়নি", "error");
          });
      }
    });
  };


  // All Month find the munafa function 
  // ===== Calculate Monthly Profits for all months =====

  const calculateMonthlyProfits = () => {
    const transactions = product.transactions || [];

    // Group transactions by month & year
    const monthlyData = {};

    transactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; // ex: 2026-02

      if (!monthlyData[key]) {
        monthlyData[key] = {
          buyWeight: 0,
          buyPrice: 0,
          sellWeight: 0,
          sellPrice: 0,
        };
      }

      monthlyData[key].buyWeight += t.kroyweight;
      monthlyData[key].buyPrice += t.kroyprice;
      monthlyData[key].sellWeight += t.dailysaleweight;
      monthlyData[key].sellPrice += t.dailysaleprice;
    });

    // Monthly profit calculation
    const monthlyProfits = Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(a + "-01") - new Date(b + "-01")) // optional: sort ascending
      .map(([key, data]) => {
        let avgBuy;

        if (data.buyWeight > 0) {
          avgBuy = data.buyPrice / data.buyWeight;
        } else {
          // last purchase before this month
          const allBefore = transactions
            .filter(tr => new Date(tr.date) < new Date(key + "-01") && tr.kroyweight > 0)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          avgBuy = allBefore.length ? allBefore[0].kroyprice / allBefore[0].kroyweight : 0;
        }

        const avgSell = data.sellWeight ? data.sellPrice / data.sellWeight : 0;

        const profit = data.sellWeight && avgBuy
          ? Number((data.sellWeight * (avgSell - avgBuy)).toFixed(2))
          : 0;

        return {
          month: key,
          buyWeight: data.buyWeight,
          buyPrice: data.buyPrice,     // ✅ fixed
          sellWeight: data.sellWeight,
          sellPrice: data.sellPrice,   // ✅ fixed
          profit,
        };
      });

    return monthlyProfits;
  };



  // Pdf download function 
  const handleDownloadPDF = () => {
    const monthlyProfits = calculateMonthlyProfits();

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    // doc.text(`${name} - Monthly Munafa Reports - Noornabi`, 14, 22, { align: "center" });
    doc.text(`${name} - Monthly Munafa Reports - Noornabi`, pageWidth / 2, 22, { align: "center" });


    const tableColumn = ["Year-Month", "Kroy Weight (kg)", "Total Kroy (Taka)", "Sell Weight (kg)", "Total Sell (Taka)", "Munafa (Taka)"];
    const tableRows = monthlyProfits.map(mp => [
      mp.month,
      mp.buyWeight,
      mp.buyPrice,
      mp.sellWeight,
      mp.sellPrice,
      mp.profit
    ]);

    // Use the imported autoTable function
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save(`${name}-monthly-profit.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">

      {/* Back Button */}
      <button
        onClick={() => navigate("/hisabnikash?tab=maler")}
        className="mb-6 px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
      >
        ← পিছনে যান
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-xl text-white mb-10 text-left">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="mt-2 opacity-90 font-semibold">পণ্য লেনদেনের বিবরণ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300">
          <p className="text-gray-500 font-bold">সর্বমোট ক্রয় ওজন</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">{totalKroyWeight} kg</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300">
          <p className="text-gray-500 font-bold">সর্বমোট বিক্রয় ওজন</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{totalSaleWeight} kg</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">বর্তমান উপস্থিত ওজন</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{presentStockWeight} kg</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট ক্রয় টাকা</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">৳ {totalKroyPrice}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট বিক্রয় টাকা</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">৳ {totalSalePrice}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট লভ্যাংশ</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">৳ {monthlyMunafa}</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 rounded-2xl bg-blue-600 cursor-pointer text-white font-bold hover:scale-105 transition flex items-center gap-2"
          >
            📄 মাসিক রিপোর্ট ডাউনলোড করুন
          </button>
        </div>
      </div>

      {/* Add Transaction Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold hover:scale-105 transition"
        >
          <FiPlusCircle className="text-xl" /> নতুন লেনদেন যোগ করুন
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">লেনদেনের বিবরণ</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className="bg-green-600 text-white text-lg">
              <tr>
                <th>তারিখ</th>
                <th>মাল ক্রয় ওজন</th>
                <th>মাল ক্রয় দর</th>
                <th>আজকের বিক্রয় ওজন</th>
                <th>আজকের বিক্রয় দর</th>
                <th>তথ্য কার্যকলাপ</th>
              </tr>
            </thead>

            <tbody>
              {currentTransactions.map((t, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td>{t.date}</td>
                  <td>{t.kroyweight} kg</td>
                  <td>৳ {t.kroyprice}</td>
                  <td>{t.dailysaleweight} kg</td>
                  <td>৳ {t.dailysaleprice}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                      onClick={() => {
                        setEditingTransaction(t);
                        setDate(t.date);
                        setKroyweight(t.kroyweight);
                        setKroyprice(t.kroyprice);
                        setDailysaleweight(t.dailysaleweight);
                        setDailysaleprice(t.dailysaleprice);
                        setIsModalOpen(true); // 🔥 এই লাইনটাই missing ছিল
                      }}
                    >
                      <FiEdit /> Update
                    </button>
                    <button
                      className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                      onClick={() => handleDeleteTransaction(t._id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-2 p-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-[90%] max-w-md shadow-2xl p-8 relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingTransaction(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition"
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-bold text-green-700 text-center">
              নতুন Transaction যোগ করুন
            </h2>

            {/* Form */}
            <div className="mt-6 space-y-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="মাল ক্রয় ওজন"
                value={kroyweight}
                onChange={(e) => setKroyweight(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="মাল ক্রয় দর"
                value={kroyprice}
                onChange={(e) => setKroyprice(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="আজকের বিক্রয় ওজন"
                value={dailysaleweight}
                onChange={(e) => setDailysaleweight(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="number"
                placeholder="আজকের বিক্রয় দর"
                value={dailysaleprice}
                onChange={(e) => setDailysaleprice(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={
                editingTransaction
                  ? handleUpdateTransaction
                  : handleAddTransaction
              }
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg hover:scale-105 transition"
            >
              সংরক্ষণ করুন
            </button>

            <style>
              {`
              @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
              }
              .animate-scaleIn {
                animation: scaleIn 0.25s ease-out;
              }
            `}
            </style>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;