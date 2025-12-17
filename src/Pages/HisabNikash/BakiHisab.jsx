import { useState } from "react";

const BakiHisab = () => {
  const [search, setSearch] = useState("");

  const bakirList = [
    { name: "Rahim Uddin", location: "Dhaka" },
    { name: "Karim Traders", location: "Chittagong" },
    { name: "সেলিম খামার", location: "Rajshahi" },
    { name: "মোঃ আল আমিন", location: "Bogura" },
    { name: "Hasan Dairy", location: "Mymensingh" },
    { name: "রফিক স্টোর", location: "Cumilla" },
  ];

  const filteredList = bakirList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ===== Heading ===== */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        বাকির তালিকাঃ
      </h1>

      {/* ===== Search Bar ===== */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="নাম দিয়ে খুঁজুন (Bangla / English)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-4 rounded-2xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-green-500
          shadow-md text-lg"
        />
      </div>

      {/* ===== List ===== */}
      <div className="space-y-5">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between
              bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl
              transition-all duration-300"
            >
              {/* Left */}
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 mt-1">
                  📍 {item.location}
                </p>
              </div>

              {/* Right */}
              <button
                className="mt-4 md:mt-0 px-6 py-3 rounded-xl
                bg-green-600 text-white font-semibold
                hover:bg-green-700 transition-all"
              >
                বিবরণ
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            কোনো তথ্য পাওয়া যায়নি
          </p>
        )}
      </div>
    </div>
  );
};

export default BakiHisab;
