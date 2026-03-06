import { FiPlusCircle, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DailyHisab = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [date, setDate] = useState("");
    const [bikri, setBikri] = useState("");
    const [uttholon, setUttholon] = useState("");
    const [baki, setBaki] = useState("");
    const [bitoron, setBitoron] = useState("");

    const [searchDate, setSearchDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const API = "http://localhost:3000/dailytransactions";


    // ================= Fetch =================
    const fetchTransactions = async () => {

        try {
            setLoading(true);

            const res = await fetch(API);
            const data = await res.json();

            setTransactions(data);

        } catch {
            Swal.fire("ডাটা লোড হয়নি ❌");
        }
        finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    // ================= Filter Month =================

    const monthFiltered = transactions.filter(t =>
        t.date?.startsWith(selectedMonth)
    );


    // ================= Search Date =================

    const filteredTransactions = searchDate
        ? monthFiltered.filter(t => t.date === searchDate)
        : monthFiltered;


    // ================= Calculations =================

    const totalBikri = monthFiltered.reduce((s, t) => s + Number(t.bikri), 0);
    const totalUttholon = monthFiltered.reduce((s, t) => s + Number(t.uttholon), 0);
    const totalBaki = monthFiltered.reduce((s, t) => s + Number(t.baki), 0);
    const totalBitoron = monthFiltered.reduce((s, t) => s + Number(t.bitoron), 0);


    // ================= Pagination =================

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const currentTransactions = [...filteredTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
    };


    // ================= Reset =================

    const resetForm = () => {
        setDate("");
        setBikri("");
        setUttholon("");
        setBaki("");
        setBitoron("");
        setEditing(null);
        setIsModalOpen(false);
    };


    // ================= Add =================

    const handleAdd = async () => {

        if (!date) {
            Swal.fire("তারিখ দিন");
            return;
        }

        try {

            await fetch(API, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ date, bikri, uttholon, baki, bitoron })
            });

            await fetchTransactions();

            resetForm();

            Swal.fire({
                icon: 'success',
                title: 'যোগ হয়েছে',
                timer: 1200,
                showConfirmButton: false
            });

        } catch {
            Swal.fire("Add Failed ❌");
        }

    };


    // ================= Update =================

    const handleUpdate = async () => {

        try {

            await fetch(`${API}/${editing._id}`, {
                method: "PUT",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ date, bikri, uttholon, baki, bitoron })
            });

            await fetchTransactions();
            resetForm();

            Swal.fire({
                icon: 'success',
                title: 'আপডেট হয়েছে',
                timer: 1200,
                showConfirmButton: false
            });

        } catch {
            Swal.fire("Update Failed ❌");
        }

    };


    // ================= Delete =================

    const handleDelete = (id) => {

        Swal.fire({
            title: "ডিলিট করবেন?",
            icon: "warning",
            showCancelButton: true
        }).then(async (res) => {

            if (!res.isConfirmed) return;

            await fetch(`${API}/${id}`, { method: "DELETE" });

            await fetchTransactions();

            Swal.fire({
                icon: 'success',
                title: 'মুছে গেছে',
                timer: 1200,
                showConfirmButton: false
            });

        });

    };


    // ================= PDF =================

    const handleDownloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Daily Hisab Report", 14, 20);

        doc.text(`Month: ${selectedMonth}`, 14, 30);

        doc.text(`Total Bikri: ${totalBikri}`, 14, 40);
        doc.text(`Total Uttholon: ${totalUttholon}`, 14, 50);
        doc.text(`Total Baki: ${totalBaki}`, 14, 60);
        doc.text(`Total Bitoron: ${totalBitoron}`, 14, 70);

        autoTable(doc, {
            startY: 80,
            head: [["Tarikh", "Bikri", "Uttholon", "Baki", "Bitoron"]],
            body: monthFiltered.map(t => [
                t.date,
                t.bikri,
                t.uttholon,
                t.baki,
                t.bitoron
            ])
        });

        doc.save("daily-hisab.pdf");

    };


    // ================= UI =================

    return (

        <div className="max-w-6xl mx-auto px-4">

            <h1 className="text-4xl font-bold text-center mb-10">দৈনিক হিসাব</h1>


            {/* Month + Search */}

            <div className="flex flex-wrap gap-4 justify-between mb-8">

                <input
                    type="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="border px-3 py-2 rounded-xl"
                />

                <input
                    type="date"
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                    className="border px-3 py-2 rounded-xl"
                />

                <button
                    onClick={handleDownloadPDF}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl"
                >
                    PDF
                </button>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-xl"
                >
                    <FiPlusCircle /> Add
                </button>

            </div>


            {/* Summary Cards */}

            <div className="grid md:grid-cols-4 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মোট বিক্রি</p>
                    <h2 className="text-3xl font-bold text-green-600">৳ {totalBikri}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>উত্তোলন</p>
                    <h2 className="text-3xl font-bold text-blue-600">৳ {totalUttholon}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মোট বাকি</p>
                    <h2 className="text-3xl font-bold text-red-600">৳ {totalBaki}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>বিতরণ</p>
                    <h2 className="text-3xl font-bold text-purple-600">৳ {totalBitoron}</h2>
                </div>

            </div>


            {/* Table */}

            <div className="bg-white rounded-3xl shadow overflow-hidden">

                <table className="table w-full text-center">

                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th>তারিখ</th>
                            <th>বিক্রি</th>
                            <th>উত্তোলন</th>
                            <th>বাকি</th>
                            <th>বিতরণ</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr><td colSpan="6">Loading...</td></tr>
                        ) : currentTransactions.map(t => (
                            <tr key={t._id}>
                                <td>{t.date}</td>
                                <td>{t.bikri}</td>
                                <td>{t.uttholon}</td>
                                <td>{t.baki}</td>
                                <td>{t.bitoron}</td>

                                <td className="flex gap-2 justify-center">

                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => {

                                            setEditing(t);

                                            setDate(t.date);
                                            setBikri(t.bikri);
                                            setUttholon(t.uttholon);
                                            setBaki(t.baki);
                                            setBitoron(t.bitoron);

                                            setIsModalOpen(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(t._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>


            {/* Pagination */}

            {totalPages > 1 && (

                <div className="flex justify-center gap-2 mt-6">

                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Next
                    </button>

                </div>

            )}


            {/* Modal */}

            {isModalOpen && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={resetForm}>

                    <div
                        className="bg-white p-8 rounded-3xl w-[90%] max-w-md"
                        onClick={e => e.stopPropagation()}
                    >

                        <button
                            onClick={resetForm}
                            className="absolute right-5 top-5 text-xl"
                        >
                            <FiX />
                        </button>

                        <h2 className="text-2xl font-bold text-center mb-6">
                            {editing ? "Update" : "Add Transaction"}
                        </h2>

                        <div className="space-y-4">

                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="Bikri" value={bikri} onChange={e => setBikri(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="Uttholon" value={uttholon} onChange={e => setUttholon(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="Baki" value={baki} onChange={e => setBaki(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="Bitoron" value={bitoron} onChange={e => setBitoron(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                        </div>

                        <button
                            onClick={editing ? handleUpdate : handleAdd}
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl font-bold"
                        >
                            Save
                        </button>

                    </div>

                </div>

            )}

        </div>

    );

};

export default DailyHisab;