import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import calculateMonthlyMunafa from "../Shared/Navbar/utils/calculateMonthlyProfit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_BASE_URL } from "../../config/api";

const MalerHisab = ({ setTotalMunafa }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 🔥 5 items per page

  const [editingProduct, setEditingProduct] = useState(null);

  // Filtered list based on search
  const filteredList = products?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const totalMonthlyMunafa = products.reduce((total, product) => {
    const munafa = calculateMonthlyMunafa(product.transactions);
    return total + munafa;
  }, 0);

  useEffect(() => {
    setTotalMunafa(totalMonthlyMunafa);
  }, [totalMonthlyMunafa]);


  // ================= Monthly Product Report =================

  const calculateMonthlyProductData = (product) => {
    const transactions = product.transactions || [];

    // Selected month-এর transactions
    const monthTransactions = transactions.filter((t) => {
      return t.date?.startsWith(selectedMonth);
    });

    // ================= Purchase =================

    let buyWeight = 0;
    let buyPrice = 0;

    monthTransactions.forEach((t) => {
      buyWeight += Number(t.kroyweight || 0);
      buyPrice += Number(t.kroyprice || 0);
    });

    // ================= Sale =================

    let saleWeight = 0;
    let salePrice = 0;

    monthTransactions.forEach((t) => {
      saleWeight += Number(t.dailysaleweight || 0);
      salePrice += Number(t.dailysaleprice || 0);
    });

    // ================= Buy Rate =================

    let averageBuyRate = 0;

    // এই মাসে purchase থাকলে
    if (buyWeight > 0) {
      averageBuyRate = buyPrice / buyWeight;
    } else {
      // এই মাসে purchase না থাকলে
      // আগের/latest purchase transaction খুঁজবে

      const lastPurchase = [...transactions]
        .filter((t) => Number(t.kroyweight || 0) > 0)
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )[0];

      if (lastPurchase) {
        averageBuyRate =
          Number(lastPurchase.kroyprice || 0) /
          Number(lastPurchase.kroyweight || 1);
      }
    }

    // ================= Sell Rate =================

    const averageSellRate =
      saleWeight > 0
        ? salePrice / saleWeight
        : 0;

    // ================= Profit / Loss =================

    const profit =
      saleWeight > 0 && averageBuyRate > 0
        ? saleWeight * (averageSellRate - averageBuyRate)
        : 0;

    return {
      saleWeight: Number(saleWeight.toFixed(2)),
      salePrice: Number(salePrice.toFixed(2)),
      buyRate: Number(averageBuyRate.toFixed(2)),
      profit: Number(profit.toFixed(2)),
    };
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "আপনি নিশ্চিত?",
      text: "এই পণ্যটি মুছে ফেললে আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#16a34a",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "না, বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            setProducts(prev => prev.filter(product => product._id !== id));
            Swal.fire({
              icon: "success",
              title: "মুছে ফেলা হয়েছে ✅",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ডিলিট ব্যর্থ ❌",
              text: "দয়া করে আবার চেষ্টা করুন",
            });
          });
      }
    });
  };


  // ================= PDF Download =================

  // ================= Monthly Product Profit PDF =================

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // =========================
    // Header
    // =========================

    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, pageWidth, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);

    doc.text("SR Tradelink By Noornabi", pageWidth / 2, 19, {
      align: "center",
    });

    // =========================
    // Title
    // =========================

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    doc.text(
      "Monthly Product Profit Report",
      pageWidth / 2,
      42,
      {
        align: "center",
      }
    );

    // =========================
    // Month
    // =========================

    doc.setFontSize(11);

    doc.text(
      `Month: ${selectedMonth}`,
      pageWidth / 2,
      49,
      {
        align: "center",
      }
    );

    // =========================
    // Prepare Data
    // =========================

    const tableData = products.map((product, index) => {

      const report = calculateMonthlyProductData(product);

      return [
        index + 1,
        product.name || "",
        `${report.saleWeight} kg`,
        `Tk ${report.salePrice}`,
        `Tk ${report.buyRate}/kg`,
        `Tk ${report.profit}`,
      ];
    });

    // =========================
    // Table
    // =========================

    autoTable(doc, {

      startY: 58,

      head: [[
        "SL",
        "Product Name",
        "Sale Weight",
        "Sale Amount",
        "Purchase Rate",
        "Profit / Loss",
      ]],

      body: tableData,

      // 🔥 আগের Baki PDF-এর মতো border
      theme: "grid",

      headStyles: {
        fillColor: [22, 163, 74],
        textColor: [255, 255, 255],
        halign: "center",
        valign: "middle",
        fontStyle: "bold",
      },

      bodyStyles: {
        textColor: [0, 0, 0],
      },

      styles: {
        fontSize: 9,
        halign: "center",
        valign: "middle",
        cellPadding: 3,
      },

      columnStyles: {

        // SL
        0: {
          cellWidth: 12,
        },

        // Product Name
        1: {
          cellWidth: 38,
          halign: "left",
        },

        // Sale Weight
        2: {
          cellWidth: 30,
        },

        // Sale Amount
        3: {
          cellWidth: 32,
        },

        // Purchase Rate
        4: {
          cellWidth: 38,
        },

        // Profit / Loss
        5: {
          cellWidth: 35,
        },
      },

      margin: {
        left: 10,
        right: 10,
      },
    });

    // =========================
    // Total Monthly Profit
    // =========================

    const totalMonthlyProfit = products.reduce((total, product) => {

      const report = calculateMonthlyProductData(product);

      return total + Number(report.profit || 0);

    }, 0);

    // =========================
    // Overall Profit
    // =========================

    const finalY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(13);

    if (totalMonthlyProfit >= 0) {
      doc.setTextColor(22, 163, 74);

      doc.text(
        `Total Monthly Profit: Tk ${totalMonthlyProfit.toFixed(2)}`,
        pageWidth - 10,
        finalY,
        {
          align: "right",
        }
      );
    } else {
      doc.setTextColor(220, 38, 38);

      doc.text(
        `Total Monthly Loss: Tk ${Math.abs(totalMonthlyProfit).toFixed(2)}`,
        pageWidth - 10,
        finalY,
        {
          align: "right",
        }
      );
    }

    // =========================
    // Footer
    // =========================

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);

    doc.text(
      "Printed by Noornabi",
      pageWidth / 2,
      pageHeight - 10,
      {
        align: "center",
      }
    );

    // =========================
    // Download
    // =========================

    doc.save(
      `SR-Tradelink-Monthly-Profit-${selectedMonth}.pdf`
    );
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        মালের তালিকা
      </h1>


      {/* Month Selector */}
      <div className="flex justify-center mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md">
            <label className="font-bold text-gray-700">
              হিসাবের মাস:
            </label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border px-4 py-2 rounded-xl
      focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex cursor-pointer ml-4 items-center gap-3 px-7 py-4 rounded-2xl
    bg-blue-600 text-white text-lg font-bold shadow-xl
    hover:bg-blue-700 hover:scale-105
    transition-all duration-300"
          >
            📄রিপোর্ট
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="নাম দিয়ে সার্চ করুন"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="w-full max-w-xl px-5 py-4 rounded-2xl border
          focus:ring-2 focus:ring-green-500 shadow-md text-lg"
        />
      </div>

      {/* Add Product Button */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center gap-3 px-8 py-4 rounded-2xl
          bg-gradient-to-r from-green-600 to-emerald-500
          text-white text-lg font-bold shadow-xl
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300"
        >
          <FiPlusCircle className="text-2xl" />
          নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">
        {paginatedList.length ? (
          paginatedList.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between
              bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 mt-1 text-left">৳ {item.pricePerKg}/kg</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 md:mt-0">
                {/* Details Button */}
                <Link
                  to={`/product-details/${item._id}`}
                  state={{ name: item.name }}
                  className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center gap-2"
                >
                  বিবরণ
                </Link>

                {/* Update Button */}
                <button
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                  onClick={() => {
                    setEditingProduct(item);
                    setName(item.name);
                    setPricePerKg(item.pricePerKg);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit /> আপডেট
                </button>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                  onClick={() => handleDeleteProduct(item._id)}
                >
                  <FiTrash2 /> ডিলিট
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">কোনো তথ্য পাওয়া যায়নি</p>
        )}
      </div>

      {/* <button
        onClick={handleDownloadPDF}
        className="flex cursor-pointer text-center mx-auto mt-10 gap-3 px-7 py-4 rounded-2xl
    bg-blue-600 text-white text-lg font-bold shadow-xl
    hover:bg-blue-700 hover:scale-105
    transition-all duration-300"
      >
        📄 মাসিক রিপোর্ট ডাউনলোড
      </button> */}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl font-bold transition
                  ${currentPage === page
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
                  }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-[90%] max-w-md
            shadow-2xl p-8 relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 text-gray-400
                hover:text-red-500 text-xl transition"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-green-700 text-center">
              {editingProduct ? "পণ্য আপডেট করুন" : "নতুন পণ্য যোগ করুন"}
            </h2>
            <p className="text-center text-gray-500 mt-2">
              নাম এবং কেজি প্রতি দাম লিখুন
            </p>

            {/* Form */}
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="পণ্যের নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border
                  focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                type="number"
                placeholder="দাম / kg"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border
                  focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                if (!name || !pricePerKg) {
                  Swal.fire({
                    icon: "warning",
                    title: "অসম্পূর্ণ তথ্য",
                    text: "অনুগ্রহ করে নাম ও দাম পূরণ করুন",
                    confirmButtonColor: "#16a34a",
                  });
                  return;
                }

                if (editingProduct) {
                  // 🔵 UPDATE
                  const updatedProduct = { name, pricePerKg: Number(pricePerKg) };
                  fetch(`${API_BASE_URL}/products/${editingProduct._id}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(updatedProduct),
                  })
                    .then(res => res.json())
                    .then(() => {
                      setProducts(prev =>
                        prev.map(p =>
                          p._id === editingProduct._id
                            ? { ...p, ...updatedProduct }
                            : p
                        )
                      );
                      Swal.fire({
                        icon: "success",
                        title: "পণ্য আপডেট হয়েছে 🎉",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    });
                } else {
                  // 🟢 ADD
                  const newProduct = { name, pricePerKg: Number(pricePerKg) };
                  fetch(`${API_BASE_URL}/products`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(newProduct),
                  })
                    .then(res => res.json())
                    .then(data => {
                      setProducts(prev => [
                        ...prev,
                        { ...newProduct, _id: data.insertedId },
                      ]);
                      Swal.fire({
                        icon: "success",
                        title: "নতুন পণ্য যোগ হয়েছে 🎉",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    });
                }

                // Reset
                setName("");
                setPricePerKg("");
                setEditingProduct(null);
                setIsModalOpen(false);
              }}
              className="w-full mt-6 py-3 rounded-xl
                bg-gradient-to-r from-green-600 to-emerald-500
                text-white font-bold text-lg
                hover:scale-105 transition"
            >
              সংরক্ষণ করুন
            </button>

            {/* Animation */}
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

export default MalerHisab;