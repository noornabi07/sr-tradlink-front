import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [paikarPassword, setPaikarPassword] = useState("");
  const [paikarError, setPaikarError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isHisabPage = location.pathname === "/hisabnikash" || location.pathname.startsWith("/product-details/") || location.pathname.startsWith("/baki-hisab/");
  const isPaikerPage = location.pathname === "/paikarhisab" || location.pathname.startsWith("/party-hisab/");

  const CORRECT_PASSWORD = "3080"; // 🔐 আপনি চাইলে পরিবর্তন করবেন
  const CORRECT_PAIKAR_PASSWORD = "5050"; // চাইলে পরিবর্তন করবেন

  const openHisabModal = () => {
    if (isHisabPage) return; // already inside → do nothing
    document.getElementById("hisab_modal").showModal();
  };

  const openPaikarModal = () => {
    document.getElementById("paikar_modal").showModal();
  };

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setError("");
      setPassword("");
      document.getElementById("hisab_modal").close();
      navigate("/hisabnikash");
    } else {
      setError("ভুল পাসওয়ার্ড ❌");
    }
  };

  const handlePaikarSubmit = () => {
    if (paikarPassword === CORRECT_PAIKAR_PASSWORD) {
      setPaikarError("");
      setPaikarPassword("");
      document.getElementById("paikar_modal").close();
      navigate("/paikarhisab");
    } else {
      setPaikarError("ভুল পাসওয়ার্ড ❌");
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link to="/">হোম</Link></li>
              <li><Link to="/#choose">পণ্যসমূহ</Link></li>
              <li><Link to="/#about">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/#contact">যোগাযোগ</Link></li>
              <li>
                <button
                  onClick={openHisabModal}
                  disabled={isHisabPage}
                  className={isHisabPage ? "opacity-50 cursor-not-allowed" : ""}
                >
                  হিসাবনিকাশ
                </button>
              </li>
              <li>
                <button 
                onClick={openPaikarModal}
                disabled={isPaikerPage}
                className={isPaikerPage ? "opacity-50 cursor-not-allowed" : ""}
                >
                  পাইকার হিসাব
                </button>
              </li>
            </ul>
          </div>

          <div className="w-12 rounded-full">
            <img src="/images/sr-logo.jpeg" alt="" />
          </div>
          <a className="btn btn-ghost text-xl font-bold text-green-700">
            এস আর ট্রেডলিংক
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg px-1 font-semibold text-green-700">
            <li>
              <Link to="/">হোম</Link>
            </li>
            <li>
              {/* <Link to="/#choose">পণ্যসমূহ</Link> */}
              <a href="#products">পণ্যসমূহ</a>
            </li>
            <li><a href="#about">আমাদের সম্পর্কে</a></li>
            <li><a href="#contact">যোগাযোগ</a></li>
            <li>
              <button
                onClick={openHisabModal}
                disabled={isHisabPage}
                className={isHisabPage ? "opacity-50 cursor-not-allowed" : ""}
              >
                হিসাবনিকাশ
              </button>
            </li>
            <li>
              <button 
              onClick={openPaikarModal}
              disabled={isPaikerPage}
              className={isPaikerPage ? "opacity-50 cursor-not-allowed" : ""}
              >
                পাইকার হিসাব
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔐 HisabNikash Modal */}
      <dialog id="hisab_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center mb-4">
            হিসাবনিকাশে প্রবেশ
          </h3>

          <input
            type="password"
            placeholder="পাসওয়ার্ড লিখুন"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <div className="modal-action">
            <button className="btn" onClick={() => document.getElementById("hisab_modal").close()}>
              বাতিল
            </button>
            <button className="btn btn-success text-white" onClick={handleSubmit}>
              প্রবেশ করুন
            </button>
          </div>
        </div>
      </dialog>

      {/* 🔐 Paikar Modal */}
      <dialog id="paikar_modal" className="modal">
        <div className="modal-box">

          <h3 className="font-bold text-xl text-center mb-4">
            পাইকার হিসাবে প্রবেশ
          </h3>

          <input
            type="password"
            placeholder="পাসওয়ার্ড লিখুন"
            className="input input-bordered w-full"
            value={paikarPassword}
            onChange={(e) => setPaikarPassword(e.target.value)}
          />

          {paikarError && (
            <p className="text-red-500 text-sm mt-2">
              {paikarError}
            </p>
          )}

          <div className="modal-action">

            <button
              className="btn"
              onClick={() =>
                document.getElementById("paikar_modal").close()
              }
            >
              বাতিল
            </button>

            <button
              className="btn btn-success text-white"
              onClick={handlePaikarSubmit}
            >
              প্রবেশ করুন
            </button>

          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
