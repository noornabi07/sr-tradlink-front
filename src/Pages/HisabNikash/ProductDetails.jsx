import { useParams, useNavigate } from "react-router-dom";
import productList from "../../../public/data/productList.json";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productList.find(item => item.id.toString() === id);

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-600 text-2xl">
        কোনো তথ্য পাওয়া যায়নি
      </div>
    );
  }

  // ===== CALCULATIONS =====
  let totalKroy = 0;
  let totalJoma = 0;

  (product.transactions || []).forEach(t => {
    totalKroy += t.kroyweight;
    totalJoma += t.kroyprice;
  });

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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-xl text-white mb-10 text-center">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="mt-2 opacity-90">পণ্য লেনদেনের বিবরণ</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center  border-2 border-gray-300">
          <p className="text-gray-500 font-bold">সর্বমোট ক্রয় ওজন</p>
          <h2 className="text-3xl font-bold text-green-700 mt-2">
            0 kg
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300">
          <p className="text-gray-500 font-bold">সর্বমোট বিক্রয় ওজন</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ৳ 0
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">বর্তমান উপস্থিত ওজন</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ 00
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট ক্রয় টাকা</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ 00
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট বিক্রয় টাকা</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ 00
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300 text-center">
          <p className="text-gray-500 font-bold">সর্বমোট লভ্যাংশ</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ 00
          </h2>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            লেনদেনের বিবরণ
          </h2>
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
              {(product.transactions || []).map((t, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td>{t.date}0</td>
                  <td>{t.kroyweight} kg</td>
                  <td>৳ {t.kroyprice}</td>
                  <td>{t.dailysaleweight} kg</td>
                  <td>৳ {t.dailysaleprice}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                      onClick={() => console.log("Update clicked:", t.id)}
                    >
                      <FiEdit /> Update
                    </button>
                    <button
                      className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                      onClick={() => console.log("Delete clicked:", t.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
