import React from "react";
import LoginRegister from "./Page/LoginRegister";
import { Route, Routes } from "react-router-dom";
import Otp from "./Page/LoginRegister/Otp";


export default function App() {


  return (
    <>


      <Routes>
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/otp" element={<Otp />}></Route>
      </Routes>
    </>
  );
}
