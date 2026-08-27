import { FiPlusCircle, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_BASE_URL } from "../../config/api";

const DailyHisab = ({ totalMunafa }) => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [date, setDate] = useState("");
    const [bikri, setBikri] = useState("");
    const [uttholon, setUttholon] = useState("");
    const [baki, setBaki] = useState("");
    const [bitoron, setBitoron] = useState("");
    const [bitoronDes, setBitoronDes] = useState("");
    const [khoroch, setKhoroch] = useState("");

    const [searchDate, setSearchDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => {
                Swal.fire("Products ডাটা লোড হয়নি ❌");
            });
    }, []);

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

    const totalMonthlyProfit = products.reduce((total, product) => {

        const report = calculateMonthlyProductData(product);

        return total + Number(report.profit || 0);

    }, 0);


    const API = `${API_BASE_URL}/dailytransactions`;


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
    const totalKhoroch = monthFiltered.reduce((s, t) => s + Number(t.khoroch || 0), 0);


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
        setBitoronDes("");
        setKhoroch("");
        setEditing(null);
        setIsModalOpen(false);
    };

    // ================ Net Munafa ===============
    const NetMonthlyProfit = (totalMunafa - totalKhoroch);


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
                body: JSON.stringify({ date, bikri, uttholon, baki, bitoron, bitoronDes, khoroch })
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
                body: JSON.stringify({ date, bikri, uttholon, baki, bitoron, bitoronDes, khoroch })
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

    // ================= PDF Download =================

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
            "Monthly Calculation Report",
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
        // Final Net Munafa
        // =========================

        const finalNetMunafa =
            Number(totalMonthlyProfit || 0) -
            Number(totalKhoroch || 0);


        // =========================
        // Summary Table Data
        // =========================

        const summaryData = [

            [
                "1",
                "Monthly Total Bikri",
                `Tk ${Number(totalBikri || 0).toFixed(2)}`
            ],

            [
                "2",
                "Monthly Total Uttholon",
                `Tk ${Number(totalUttholon || 0).toFixed(2)}`
            ],

            [
                "3",
                "Monthly Total Baki",
                `Tk ${Number(totalBaki || 0).toFixed(2)}`
            ],

            [
                "4",
                "Monthly Total Bitoron",
                `Tk ${Number(totalBitoron || 0).toFixed(2)}`
            ],

            [
                "5",
                "Monthly Total Khoroch",
                `Tk ${Number(totalKhoroch || 0).toFixed(2)}`
            ],

            [
                "6",
                "Monthly Total Profit",
                `Tk ${Number(totalMonthlyProfit || 0).toFixed(2)}`
            ],

        ];


        // =========================
        // Summary Table
        // =========================

        autoTable(doc, {

            startY: 58,

            head: [[
                "SL",
                "Calculation Summary",
                "Quantity",
            ]],

            body: summaryData,

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
                fontSize: 11,
                halign: "center",
                valign: "middle",
                cellPadding: 4,
            },

            columnStyles: {

                // SL
                0: {
                    cellWidth: 20,
                },

                // Description
                1: {
                    cellWidth: 95,
                    halign: "left",
                },

                // Amount
                2: {
                    cellWidth: 65,
                    halign: "right",
                },

            },

            margin: {
                left: 15,
                right: 15,
            },

        });


        // =========================
        // Final Net Munafa
        // =========================

        const finalY = doc.lastAutoTable.finalY + 18;

        doc.setFontSize(14);

        if (finalNetMunafa >= 0) {

            doc.setTextColor(22, 163, 74);

            doc.text(
                `Final Net Munafa: Tk ${finalNetMunafa.toFixed(2)}`,
                pageWidth - 10,
                finalY,
                {
                    align: "right",
                }
            );

        } else {

            doc.setTextColor(220, 38, 38);

            doc.text(
                `Final Net Loss: Tk ${Math.abs(finalNetMunafa).toFixed(2)}`,
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
            `SR-Tradelink-Daily-Hisab-${selectedMonth}.pdf`
        );

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
                    className="px-5 py-2 bg-blue-600 text-white cursor-pointer rounded-xl"
                >
                    এই মাসের ফলাফল ডাউনলোড করুন
                </button>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 cursor-pointer py-2 bg-green-600 text-white rounded-xl"
                >
                    <FiPlusCircle /> লেনদেন যোগ করুন
                </button>

            </div>


            {/* Summary Cards */}

            <div className="grid md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট বিক্রি</p>
                    <h2 className="text-3xl font-bold text-green-600">৳ {totalBikri}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট উত্তোলন</p>
                    <h2 className="text-3xl font-bold text-blue-600">৳ {totalUttholon}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট বাকি</p>
                    <h2 className="text-3xl font-bold text-red-600">৳ {totalBaki}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট বিতরণ</p>
                    <h2 className="text-3xl font-bold text-purple-600">৳ {totalBitoron}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট খরচ</p>
                    <h2 className="text-3xl font-bold text-orange-600">৳ {totalKhoroch}</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <p>মাসের মোট মুনাফা</p>
                    <h2 className="text-3xl font-bold text-green-600">৳ {totalMonthlyProfit}</h2>
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
                            <th>বিতরণের বিবরণ</th>
                            <th>খরচ</th>
                            <th>কার্যকলাপ</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr><td colSpan="7">Loading...</td></tr>
                        ) : currentTransactions.map(t => (
                            <tr key={t._id}>
                                <td>{t.date}</td>
                                <td>{t.bikri}</td>
                                <td>{t.uttholon}</td>
                                <td>{t.baki}</td>
                                <td>{t.bitoron}</td>
                                <td>{t.bitoronDes}</td>
                                <td>{t.khoroch}</td>

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
                                            setBitoronDes(t.bitoronDes);
                                            setKhoroch(t.khoroch);

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

                            <input type="number" placeholder="মোট বিক্রয়" value={bikri} onChange={e => setBikri(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="মোট উত্তোলন" value={uttholon} onChange={e => setUttholon(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="মোট বাকি " value={baki} onChange={e => setBaki(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="মোট বিতরণ" value={bitoron} onChange={e => setBitoron(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="text" placeholder="বিতরণ নোট" value={bitoronDes} onChange={e => setBitoronDes(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

                            <input type="number" placeholder="মোট খরচ" value={khoroch} onChange={e => setKhoroch(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

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