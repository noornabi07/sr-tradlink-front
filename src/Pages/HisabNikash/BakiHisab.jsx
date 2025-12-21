import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import bakirList from "../../../public/data/bakirList.json";

const BakiHisab = () => {
  const [search, setSearch] = useState("");

  const filteredList = bakirList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        বাকি নামের তালিকা
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="নাম দিয়ে সার্চ করুন"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-4 rounded-2xl border
          focus:ring-2 focus:ring-green-500 shadow-md text-lg"
        />
      </div>

      {/* List */}
      <div className="space-y-5">
        {filteredList.length ? (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between
              bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 mt-1 text-left">📍 {item.location}</p>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <Link
                  to={`/baki-hisab/${item.id}`}
                  className="px-5 py-2 rounded-xl
                  bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center gap-2"
                >
                  বিবরণ
                </Link>

                {/* Update Button */}
                <button
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                  onClick={() => console.log("Update clicked:", item.id)}
                >
                  <FiEdit /> আপডেট
                </button>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
                  onClick={() => console.log("Delete clicked:", item.id)}
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
    </div>
  );
};

export default BakiHisab;

