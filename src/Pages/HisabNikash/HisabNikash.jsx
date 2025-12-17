import { useState } from "react";
import BakiHisab from "./BakiHisab";

const HisabNikash = () => {
  const [activeTab, setActiveTab] = useState("maler");

  return (
    <div className="min-h-screen pt-28 px-4 bg-base-200">
      {/* ===== Top Buttons ===== */}
      <div className="flex justify-center">
        <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("maler")}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              ${
                activeTab === "maler"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-base-100 text-gray-600 hover:bg-green-50"
              }`}
          >
            মালের স্টোক হিসাব
          </button>

          <button
            onClick={() => setActiveTab("baki")}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              ${
                activeTab === "baki"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-base-100 text-gray-600 hover:bg-green-50"
              }`}
          >
            বাকির হিসাব
          </button>
        </div>
      </div>

      {/* ===== Page Content ===== */}
      <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">
        {activeTab === "maler" && <MalerHisab />}
        {activeTab === "baki" && <BakiHisab />}
      </div>
    </div>
  );
};

export default HisabNikash;

/* ===== Sub Pages ===== */

const MalerHisab = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700">
        মালের স্টক হিসাব
      </h1>
    </div>
  );
};
