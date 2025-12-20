import { useParams, useNavigate } from "react-router-dom";
import bakirList from "../../../public/data/bakirList.json";

const BakiDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = bakirList.find(
    (item) => item.id === parseInt(id)
  );

  if (!user) {
    return (
      <h2 className="text-center text-red-600 text-2xl mt-20">
        তথ্য পাওয়া যায়নি
      </h2>
    );
  }

  // ===== 🔢 CALCULATIONS =====
  let totalKroy = 0;
  let totalJoma = 0;

  user.transactions.forEach((t) => {
    totalKroy += t.kroy;
    totalJoma += t.joma;
  });

  let runningKroy = 0;
  let runningJoma = 0;

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/hisabnikash")}
        className="mb-6 px-5 py-2 rounded-xl
        bg-gray-100 text-gray-700 font-semibold
        hover:bg-gray-200 transition"
      >
        ← পিছনে যান
      </button>

      {/* ===== Header ===== */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600
        rounded-3xl p-8 shadow-xl text-white mb-10">
        <h1 className="text-4xl font-bold">{user.name}</h1>
        <p className="mt-2 opacity-90">বাকির হিসাব বিবরণ</p>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-500 font-bold">মোট ক্রয়</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            ৳ {totalKroy}
          </h2>
        </div>

        <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-500 font-bold">মোট জমা</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ৳ {totalJoma}
          </h2>
        </div>

        <div className="bg-base-100 rounded-2xl p-6 shadow-lg border-2 border-red-500">
          <p className="text-gray-500 font-bold">বর্তমান পাওনা</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ {totalKroy - totalJoma}
          </h2>
        </div>
      </div>

      {/* ===== Details Table ===== */}
      <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            লেনদেনের বিবরণ
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-green-600 text-white text-lg">
              <tr>
                <th>তারিখঃ</th>
                <th>ক্রয়ঃ</th>
                <th>মোট ক্রয়</th>
                <th>জমা তারিখঃ</th>
                <th>জমাঃ</th>
                <th>মোট জমাঃ </th>
              </tr>
            </thead>

            <tbody>
              {user.transactions.map((t, index) => {
                runningKroy += t.kroy;
                runningJoma += t.joma;

                return (
                  <tr key={index} className="hover">
                    <td>{t.date}</td>
                    <td>৳ {t.kroy}</td>
                    <td>৳ {runningKroy}</td>
                    <td>{t.jomaDate}</td>
                    <td>৳ {t.joma}</td>
                    <td>৳ {runningJoma}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BakiDetails;
