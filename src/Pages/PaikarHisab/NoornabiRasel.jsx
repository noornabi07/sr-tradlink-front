import { FiPlusCircle, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NoornabiRasel = ({ setActiveTab }) => {

    // ================= State =================
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [date, setDate] = useState("");
    const [motKroy, setMotKroy] = useState("");
    const [cashJoma, setCashJoma] = useState("");
    const [description, setDescription] = useState("");

    // ================= Pagination =================
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // ================= Load Data =================
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/dokantransactions");
            if (!res.ok) throw new Error();
            const data = await res.json();
            setTransactions(data);
        } catch {
            Swal.fire("ডাটা লোড হয়নি ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // ================= Calculations =================
    const totalKroy = transactions.reduce((sum, t) => sum + Number(t.motKroy), 0);
    const totalJoma = transactions.reduce((sum, t) => sum + Number(t.cashJoma), 0);
    const totalPawna = totalKroy - totalJoma;

    // ================= Reset =================
    const resetForm = () => {
        setDate("");
        setMotKroy("");
        setCashJoma("");
        setDescription("");
        setEditing(null);
        setIsModalOpen(false);
    };

    // ================= Add =================
    const handleAdd = async () => {
        if (!date || !motKroy || !cashJoma) {
            Swal.fire("সব তথ্য দিন ⚠️");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/dokantransactions", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ date, motKroy, cashJoma, description })
            });

            if (!res.ok) throw new Error();
            await fetchTransactions();
            resetForm();
            Swal.fire({ icon: "success", title: "যোগ হয়েছে 🎉", timer: 1200, showConfirmButton: false });
        } catch {
            Swal.fire("Add Failed ❌");
        }
    };

    // ================= Update =================
    const handleUpdate = async () => {
        if (!editing) return;
        try {
            const res = await fetch(`http://localhost:3000/dokantransactions/${editing._id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ date, motKroy, cashJoma, description })
            });
            if (!res.ok) throw new Error();
            await fetchTransactions();
            resetForm();
            Swal.fire({ icon: "success", title: "আপডেট হয়েছে ✅", timer: 1200, showConfirmButton: false });
        } catch {
            Swal.fire("Update Failed ❌");
        }
    };

    // ================= Delete =================
    const handleDelete = (id) => {
        Swal.fire({
            title: "ডিলিট করবেন?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ"
        }).then(async (res) => {
            if (!res.isConfirmed) return;
            try {
                const response = await fetch(`http://localhost:3000/dokantransactions/${id}`, { method: "DELETE" });
                if (!response.ok) throw new Error();
                await fetchTransactions();
                Swal.fire({ icon: "success", title: "মুছে গেছে 🗑️", timer: 1200, showConfirmButton: false });
            } catch {
                Swal.fire("Delete Failed ❌");
            }
        });
    };

    // ================= PDF =================
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
        doc.text(`Party Name: Md Rasel Islam`, pageWidth / 2, 50, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Total Kroy: ${totalKroy} TK`, pageWidth / 2, 65, { align: "center" });
        doc.text(`Total Joma: ${totalJoma} TK`, pageWidth / 2, 75, { align: "center" });
        doc.text(`Present Pawna: ${totalPawna} TK`, pageWidth / 2, 85, { align: "center" });

        autoTable(doc, {
            startY: 55,
            headStyles: { fillColor: [22, 163, 35], textColor: 255 },
            bodyStyles: { textColor: 0 },
            styles: { halign: "center" },
        });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Printed by Noornabi", pageWidth / 2, pageHeight - 10, { align: "center" });

        doc.save(`NoornabiRasel-statement.pdf`);
    };

    // ================= Pagination Helpers =================
    const currentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // ================= UI =================
    return (
        <div className="max-w-6xl mx-auto px-4">

            <button onClick={() => setActiveTab("party")} className="mb-6 px-5 py-2 rounded-xl bg-gray-100 font-semibold">
                ← পিছনে যান
            </button>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-10">
                <h1 className="text-4xl font-bold">নুরনবী - রাসেল</h1>
                <p className="mt-2">হিসাব বিবরণ</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-base-100 p-6 rounded-2xl shadow text-center">
                    <p>মোট ক্রয়</p>
                    <h2 className="text-3xl font-bold text-green-700">৳ {totalKroy}</h2>
                </div>
                <div className="bg-base-100 p-6 rounded-2xl shadow text-center">
                    <p>মোট জমা</p>
                    <h2 className="text-3xl font-bold text-blue-600">৳ {totalJoma}</h2>
                </div>
                <div className="bg-base-100 p-6 rounded-2xl shadow border-2 border-red-500 text-center">
                    <p>পাওনা</p>
                    <h2 className="text-3xl font-bold text-red-600">৳ {totalPawna}</h2>
                </div>
            </div>

            <div className="mx-auto w-64 mb-5">
                <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold hover:scale-105 transition">
                    📄 PDF ডাউনলোড
                </button>
            </div>

            <div className="flex justify-end mb-5">
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-600 text-white font-bold">
                    <FiPlusCircle /> নতুন লেনদেন যোগ করুন
                </button>
            </div>

            <div className="bg-base-100 rounded-3xl shadow overflow-hidden">
                {loading ? (
                    <p className="p-6 text-center font-bold">Loading...</p>
                ) : (
                    <table className="table w-full text-center">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th>তারিখ</th>
                                <th>মোট ক্রয়</th>
                                <th>ক্যাশ জমা</th>
                                <th>বিবরণ</th>
                                <th>তথ্য কার্যকলাপ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions.map(t => (
                                <tr key={t._id}>
                                    <td>{t.date}</td>
                                    <td>৳ {t.motKroy}</td>
                                    <td>৳ {t.cashJoma}</td>
                                    <td>{t.description || "N/A"}</td>
                                    <td className="flex gap-2 justify-center">
                                        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => { setEditing(t); setDate(t.date); setMotKroy(t.motKroy); setCashJoma(t.cashJoma); setDescription(t.description || ""); setIsModalOpen(true); }}>আপডেট</button>
                                        <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(t._id)}>ডিলিট</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={resetForm}>
                    <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md relative" onClick={e => e.stopPropagation()}>
                        <button onClick={resetForm} className="absolute top-4 right-4 text-xl"><FiX /></button>
                        <h2 className="text-2xl font-bold text-center text-green-700">{editing ? "আপডেট করুন" : "নতুন যোগ করুন"}</h2>
                        <div className="mt-6 space-y-4">
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                            <input type="number" placeholder="মোট ক্রয়" value={motKroy} onChange={e => setMotKroy(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                            <input type="number" placeholder="ক্যাশ জমা" value={cashJoma} onChange={e => setCashJoma(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                            <input type="text" placeholder="বিবরণ (ঐচ্ছিক)" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                        </div>
                        <button onClick={editing ? handleUpdate : handleAdd} className="w-full mt-6 py-3 rounded-xl bg-green-600 text-white font-bold">আপডেট করুন</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NoornabiRasel;