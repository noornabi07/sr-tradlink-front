import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DailyTransaction from "./DailyTransaction";
import DharHisab from "./DharHisab";
import PartyHisab from "./PartyHisab";

const PaikerHisab = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "party";
  const [activeTab, setActiveTab] = useState(defaultTab);
  

  return (
    <div className="min-h-screen pt-28 px-4 bg-base-200">
      {/* ===== Top Buttons ===== */}
      <div className="flex justify-center">
        <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-lg">

          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              ${
                activeTab === "history"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-base-100 text-green-600 hover:bg-green-50"
              }`}
          >
            দৈনিক হিস্টোরি
          </button>

          <button
            onClick={() => setActiveTab("dhar")}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              ${
                activeTab === "dhar"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-base-100 text-green-600 hover:bg-green-50"
              }`}
          >
            ধার হিসাব 
          </button>

          <button
            onClick={() => setActiveTab("party")}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              ${
                activeTab === "party"
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-base-100 text-green-600 hover:bg-green-50"
              }`}
          >
            পার্টি হিসাব
          </button>
        </div>
      </div>

      {/* ===== Page Content ===== */}
      <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">
        {activeTab === "history" && <DailyTransaction/>}
        {activeTab === "dhar" && <DharHisab/>}
        {activeTab === "party" && <PartyHisab/>}
      </div>
    </div>
  );
};

export default PaikerHisab;
