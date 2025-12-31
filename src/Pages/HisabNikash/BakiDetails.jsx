import { useParams, useNavigate } from "react-router-dom";
import bakirList from "../../../public/data/bakirList.json";
import { FiEdit, FiPlusCircle, FiTrash2, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

const BakiDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState("");
    const [kroy, setKroy] = useState("");
    const [joma, setJoma] = useState("");


    const user = bakirList.find(
        (item) => item.id === parseInt(id)
    );

    if (!user) {
        return (
            <h2 className="text-center text-red-600 text-2xl mt-20">
                কোনো তথ্য পাওয়া যায়নি
            </h2>
        );
    }

    // ===== CALCULATIONS =====
    let totalKroy = 0;
    let totalJoma = 0;

    user.transactions.forEach((t) => {
        totalKroy += t.kroy;
        totalJoma += t.joma;
    });

    let runningKroy = 0;
    let runningJoma = 0;


    const handleAddTransaction = () => {
        if (!date || kroy === "" || joma === "") {
            Swal.fire({
                icon: "warning",
                title: "অসম্পূর্ণ তথ্য",
                text: "সব ফিল্ড পূরণ করুন",
                confirmButtonColor: "#16a34a",
            });
            return;
        }

        const newTransaction = {
            id: Date.now(),
            date,
            kroy: parseFloat(kroy),
            joma: parseFloat(joma),
        };

        console.log("New Transaction:", newTransaction);

        Swal.fire({
            icon: "success",
            title: "লেনদেন সফলভাবে যোগ করা হয়েছে",
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
        });

        setDate("");
        setKroy("");
        setJoma("");
        setIsModalOpen(false);
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
                <h1 className="text-4xl font-bold">{user.name}</h1>
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
                                <th>মোট ক্রয়</th>
                                <th>জমাঃ</th>
                                <th>মোট জমাঃ </th>
                                <th>তথ্য কার্যকলাপ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {user.transactions.map((t, index) => {

                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td>{t.date}</td>
                                        <td>৳ {t.kroy}</td>
                                        <td>৳ {runningKroy}</td>
                                        <td>৳ {t.joma}</td>
                                        <td>৳ {runningJoma}</td>
                                        {/* Actions Buttons */}
                                        <td className="flex justify-center gap-2">
                                            <button
                                                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                                                onClick={() => console.log("Update clicked:", item.id)}
                                            >
                                                <FiEdit /> আপডেট
                                            </button>
                                            <button
                                                className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                                                onClick={() => console.log("Delete clicked:", item.id)}
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
                            নতুন লেনদেন যোগ করুন
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
                                value={kroy}
                                onChange={(e) => setKroy(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
                            />
                            <input
                                type="number"
                                placeholder="মাল ক্রয় দর"
                                value={joma}
                                onChange={(e) => setJoma(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleAddTransaction}
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

