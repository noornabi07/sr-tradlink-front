import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;