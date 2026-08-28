import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiEdit, FiPlusCircle, FiTrash2, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_BASE_URL } from "../../config/api";

const PartyDetails = () => {
    const { id } = useParams();
    const [party, setParty] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { name } = location.state || {};

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [date, setDate] = useState("");
    const [kroy, setKroy] = useState("");
    const [joma, setJoma] = useState("");
    const [biboron, setBiboron] = useState("");

    // ================= Pagination =================
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Party statement read
    useEffect(() => {
        fetch(`${API_BASE_URL}/partys/${id}`)
            .then(res => res.json())
            .then(data => setParty(data));
    }, [id]);

    // ===== CALCULATIONS =====
    let totalKroy = 0;
    let totalJoma = 0;

    party?.transactions?.forEach((t) => {
        totalKroy += t.kroy;
        totalJoma += t.joma;
    });

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFontSize(28);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(22, 163, 35);
        doc.rect(0, 0, pageWidth, 30, "F");
        doc.text("SR Tradelink", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Party Name: ${name}`, pageWidth / 2, 50, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Total Kroy: ${totalKroy} TK`, pageWidth / 2, 65, { align: "center" });
        doc.text(`Total Joma: ${totalJoma} TK`, pageWidth / 2, 75, { align: "center" });
        doc.text(`Present Pawna: ${totalKroy - totalJoma} TK`, pageWidth / 2, 85, { align: "center" });

        autoTable(doc, {
            startY: 55,
            headStyles: { fillColor: [22, 163, 35], textColor: 255 },
            bodyStyles: { textColor: 0 },
            styles: { halign: "center" },
        });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Printed by Noornabi", pageWidth / 2, pageHeight - 10, { align: "center" });

        doc.save(`${name}-statement.pdf`);
    };

    // ================= Add / Update / Delete =================
    const handleAddTransaction = () => {
        if (!date || kroy === "" || joma === "" || biboron === "") {
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
            biboron: biboron
        };

        fetch(`${API_BASE_URL}/partys/${id}/transactions`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTransaction)
        })
            .then(res => res.json())
            .then(() => {
                setParty(prev => ({
                    ...prev,
                    transactions: [...(prev?.transactions || []), newTransaction]
                }));

                setDate(""); setKroy(""); setJoma(""); setBiboron("");
                setIsModalOpen(false);
                Swal.fire({ icon: "success", title: "লেনদেন যোগ হয়েছে 🎉", timer: 1500, showConfirmButton: false });
            });
    };

    const handleUpdateTransaction = () => {
        const updatedTransaction = {
            ...editingTransaction,
            date,
            kroy: Number(kroy),
            joma: Number(joma),
            biboron
        };

        fetch(`${API_BASE_URL}/partys/${id}/transactions/${editingTransaction._id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedTransaction)
        })
            .then(res => res.json())
            .then(() => {
                setParty(prev => ({
                    ...prev,
                    transactions: prev.transactions.map(t => t._id === editingTransaction._id ? updatedTransaction : t)
                }));
                Swal.fire({ icon: "success", title: "লেনদেন আপডেট হয়েছে 🎉", timer: 1500, showConfirmButton: false });
                setIsModalOpen(false); setEditingTransaction(null);
            })
            .catch(err => {
                console.error(err);
                Swal.fire({ icon: "error", title: "আপডেট ব্যর্থ হয়েছে", text: "দয়া করে আবার চেষ্টা করুন" });
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
                fetch(`${API_BASE_URL}/partys/${id}/transactions/${transactionId}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(() => {
                        setParty(prev => ({
                            ...prev,
                            transactions: prev.transactions.filter(t => t._id !== transactionId)
                        }));
                        Swal.fire({ icon: "success", title: "লেনদেন মুছে দেওয়া হয়েছে 🎉", timer: 1500, showConfirmButton: false });
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({ icon: "error", title: "মুছে দেওয়া ব্যর্থ হয়েছে", text: "দয়া করে আবার চেষ্টা করুন" });
                    });
            }
        });
    };

    // ================= Pagination =================
    const sortedTransactions = [...(party?.transactions || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const currentTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // ================= UI =================
    return (
        <div className="max-w-6xl mx-auto mt-24 px-4">

            <button onClick={() => navigate("/paikarhisab")} className="mb-6 px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">← পিছনে যান</button>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-xl text-white mb-10">
                <h1 className="text-4xl font-bold">{name}</h1>
                <p className="mt-2 opacity-90">পার্টির হিসাব বিবরণ</p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg text-center">
                    <p className="text-gray-500 font-bold">মোট ক্রয়</p>
                    <h2 className="text-3xl font-bold text-green-700 mt-2">৳ {totalKroy}</h2>
                </div>
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg text-center">
                    <p className="text-gray-500 font-bold">মোট জমা</p>
                    <h2 className="text-3xl font-bold text-blue-600 mt-2">৳ {totalJoma}</h2>
                </div>
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border-2 border-red-500 text-center">
                    <p className="text-gray-500 font-bold">বর্তমান পাওনা</p>
                    <h2 className="text-3xl font-bold text-red-600 mt-2">৳ {totalKroy - totalJoma}</h2>
                </div>
            </div>

            <div className="mx-auto w-64 mb-5">
                <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold hover:scale-105 transition">📄 PDF ডাউনলোড</button>
            </div>

            {/* Transactions Table */}
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">লেনদেনের বিবরণ</h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold hover:scale-105 transition">
                        <FiPlusCircle className="text-xl" /> নতুন লেনদেন যোগ করুন
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full text-center">
                        <thead className="bg-green-600 text-white text-lg">
                            <tr>
                                <th>তারিখঃ</th>
                                <th>ক্রয়ঃ</th>
                                <th>জমাঃ</th>
                                <th>বিবরণ</th>
                                <th>তথ্য কার্যকলাপ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50 transition">
                                    <td>{t.date}</td>
                                    <td>৳ {t.kroy}</td>
                                    <td>৳ {t.joma}</td>
                                    <td title={t.biboron} className="max-w-[150px] truncate cursor-help text-sm">{t.biboron}</td>
                                    <td className="flex justify-center gap-2">
                                        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
                                            onClick={() => {
                                                setEditingTransaction(t); setDate(t.date); setKroy(t.kroy); setJoma(t.joma); setBiboron(t.biboron); setIsModalOpen(true);
                                            }}>আপডেট</button>
                                        <button className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold" onClick={() => handleDeleteTransaction(t._id)}>ডিলিট</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== Pagination Controls ===== */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4 mb-10">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
                </div>
            )}

            {/* Add Transaction Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-3xl w-[90%] max-w-md shadow-2xl p-8 relative animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition"><FiX /></button>
                        <h2 className="text-2xl font-bold text-green-700 text-center">{editingTransaction ? "লেনদেন আপডেট করুন" : "নতুন লেনদেন যোগ করুন"}</h2>
                        <div className="mt-6 space-y-4">
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-black bg-gray-100" />

                            <input type="number" placeholder="মোট ক্রয় দর" value={kroy} onChange={(e) => setKroy(e.target.value)} className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-black bg-gray-100" />

                            <input type="number" placeholder="জমা" value={joma} onChange={(e) => setJoma(e.target.value)} className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-black bg-gray-100" />

                            <input type="text" placeholder="বিবরণ" value={biboron} onChange={(e) => setBiboron(e.target.value)} className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-black bg-gray-100" />
                        </div>
                        <button onClick={editingTransaction ? handleUpdateTransaction : handleAddTransaction} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg hover:scale-105 transition">সংরক্ষণ করুন</button>
                        <style>{`
                          @keyframes scaleIn {
                            from { opacity: 0; transform: scale(0.9); }
                            to { opacity: 1; transform: scale(1); }
                          }
                          .animate-scaleIn {
                            animation: scaleIn 0.25s ease-out;
                          }
                        `}</style>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PartyDetails;