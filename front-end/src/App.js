import React, { useState } from "react";
import LoginRegister from "./Page/LoginRegister";
import { Route, Routes } from "react-router-dom";
import Otp from "./Page/LoginRegister/Otp";
import PhoneContext from "./utils/PhoneContext";
import Home from "./Page/Home";

export default function App() {
  const [registerPhone, setRegisterPhone] = useState();

  const handleRegisterPhone = (e) => {
    setRegisterPhone(e);
  };

  return (
    <>
      <PhoneContext.Provider value={{ registerPhone, handleRegisterPhone }}>
        <Routes>
        <Route exact path="" element={<Home/>}></Route>
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/otp" element={<Otp />}></Route>
        </Routes>
      </PhoneContext.Provider>
    </>
  );
}
