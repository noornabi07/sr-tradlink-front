import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlusCircle, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const MalerHisab = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  // Delete function

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
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(() => {
            // 🔥 UI থেকে সাথে সাথে remove
            setProducts(prev =>
              prev.filter(product => product._id !== id)
            );

            Swal.fire({
              icon: "success",
              title: "মুছে ফেলা হয়েছে ✅",
              text: "পণ্যটি সফলভাবে ডিলিট করা হয়েছে",
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


  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        মালের তালিকা
      </h1>

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
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between
              bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 mt-1 text-left">৳ {item.pricePerKg}/kg</p>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
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

                // 🔵 UPDATE MODE
                if (editingProduct) {
                  const updatedProduct = {
                    name,
                    pricePerKg: Number(pricePerKg),
                  };

                  fetch(`http://localhost:3000/products/${editingProduct._id}`, {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
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
                  // 🟢 ADD MODE
                  const newProduct = {
                    id: Date.now(),
                    name,
                    pricePerKg: Number(pricePerKg),
                    transactions: [],
                  };

                  fetch("http://localhost:3000/products", {
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
          </div>

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
      )}
    </div>
  );
};

export default MalerHisab;
