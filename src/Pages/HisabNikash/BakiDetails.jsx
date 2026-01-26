import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiEdit, FiPlusCircle, FiTrash2, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const BakiDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { name } = location.state || {};

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [date, setDate] = useState("");
    const [kroy, setKroy] = useState("");
    const [joma, setJoma] = useState("");
    const [baki, setBaki] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/clients/${id}`)
            .then(res => res.json())
            .then(data => setClient(data));
    }, [id]);

    // ===== CALCULATIONS =====
    let totalKroy = 0;
    let totalJoma = 0;

    client?.transactions?.forEach((t) => {
        totalKroy += t.kroy;
        totalJoma += t.joma;
    });

    const handleAddTransaction = () => {
        if (!date || kroy === "" || joma === "" || baki === "") {
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
            kroy: Number(kroy),
            joma: Number(joma),
            baki: Number(baki)
        };

        console.log("New Transaction:", newTransaction);

        fetch(`http://localhost:3000/clients/${id}/transactions`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTransaction)
        })
            .then(res => res.json())
            .then(() => {
                setClient(prev => ({
                    ...prev,
                    transactions: [...(prev?.transactions || []), newTransaction]
                }));

                Swal.fire({
                    icon: "success",
                    title: "লেনদেন যোগ হয়েছে 🎉",
                    timer: 1500,
                    showConfirmButton: false
                });
            })
        setIsModalOpen(false);
    };

    const handleUpdateTransaction = () => {
        const updatedTransaction = {
            ...editingTransaction,
            date,
            kroy: Number(kroy),
            joma: Number(joma),
            baki: Number(baki),
        };

        fetch(`http://localhost:3000/clients/${id}/transactions/${editingTransaction._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedTransaction)
        })
            .then(res => res.json())
            .then(() => {
                setClient(prev => ({
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

    const handleDeleteTransaction = (transactionId) => {
        Swal.fire({
            icon: "warning",
            title: "আপনি কি নিশ্চিত?",
            text: "লেনদেনটি স্থায়ীভাবে মুছে যাবে।",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, মুছে দিন",
            cancelButtonText: "বাতিল",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/clients/${id}/transactions/${transactionId}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(() => {
                        // Frontend state update
                        setClient(prev => ({
                            ...prev,
                            transactions: prev.transactions.filter(t => t._id !== transactionId)
                        }));

                        Swal.fire({
                            icon: "success",
                            title: "লেনদেন মুছে দেওয়া হয়েছে 🎉",
                            timer: 1500,
                            showConfirmButton: false
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            icon: "error",
                            title: "মুছে দেওয়া ব্যর্থ হয়েছে",
                            text: "দয়া করে আবার চেষ্টা করুন"
                        });
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto mt-24 px-4">

            {/* Back Button */}
            <button
                onClick={() => navigate("/hisabnikash")}
                className="mb-6 px-5 py-2 rounded-xl
        bg-gray-100 text-gray-700 font-semibold
        hover:bg-gray-200 transition"
            >
                ← পিছনে যান
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600
        rounded-3xl p-8 shadow-xl text-white mb-10">
                <h1 className="text-4xl font-bold">{name}</h1>
                <p className="mt-2 opacity-90">বাকির হিসাব বিবরণ</p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg text-center">
                    <p className="text-gray-500 font-bold">মোট ক্রয়</p>
                    <h2 className="text-3xl font-bold text-green-700 mt-2">
                        ৳ {totalKroy}
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-6 shadow-lg text-center">
                    <p className="text-gray-500 font-bold">মোট জমা</p>
                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        ৳ {totalJoma}
                    </h2>
                </div>

                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border-2 border-red-500 text-center">
                    <p className="text-gray-500 font-bold">বর্তমান পাওনা</p>
                    <h2 className="text-3xl font-bold text-red-600 mt-2">
                        ৳ {totalKroy - totalJoma}
                    </h2>
                </div>
            </div>

            {/* Add Transaction Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold hover:scale-105 transition"
                >
                    <FiPlusCircle className="text-xl" /> নতুন লেনদেন যোগ করুন
                </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        লেনদেনের বিবরণ
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full text-center">
                        <thead className="bg-green-600 text-white text-lg">
                            <tr>
                                <th>তারিখঃ</th>
                                <th>ক্রয়ঃ</th>
                                <th>জমাঃ</th>
                                <th>বাকি</th>
                                <th>তথ্য কার্যকলাপ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {client?.transactions?.map((t, index) => {

                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td>{t.date}</td>
                                        <td>৳ {t.kroy}</td>
                                        <td>৳ {t.joma}</td>
                                        <td>৳ {t.baki}</td>
                                        {/* Actions Buttons */}
                                        <td className="flex justify-center gap-2">
                                            <button
                                                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                                                onClick={() => {
                                                    setEditingTransaction(t);   // 🔥 এই row টাকেই ধরলাম
                                                    setDate(t.date);
                                                    setKroy(t.kroy);
                                                    setJoma(t.joma);
                                                    setBaki(t.baki);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <FiEdit /> আপডেট
                                            </button>
                                            <button
                                                className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                                                onClick={() => handleDeleteTransaction(t._id)}
                                            >
                                                <FiTrash2 /> ডিলিট
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition"
                        >
                            <FiX />
                        </button>

                        <h2 className="text-2xl font-bold text-green-700 text-center">
                            {editingTransaction ? "লেনদেন আপডেট করুন" : "নতুন লেনদেন যোগ করুন"}
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
                                placeholder="মোট ক্রয় দর"
                                value={kroy}
                                onChange={(e) => setKroy(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            <input
                                type="number"
                                placeholder="জমা"
                                value={joma}
                                onChange={(e) => setJoma(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            <input
                                type="number"
                                placeholder="বাকি"
                                value={baki}
                                onChange={(e) => setBaki(e.target.value)}
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

export default BakiDetails;

