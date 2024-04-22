import React, { useState } from "react";
import LoginRegister from "./Page/LoginRegister";
import { Route, Routes } from "react-router-dom";
import Otp from "./Page/Otp";
import Home from "./Page/Home";
import PhoneContext from "./utils/loginContext";
import UsernameContext from "./utils/usernameContext";
import PasswordContext from "./utils/passwordContext";
import Login from "./Page/Login";
import Register from "./Page/Register";

export default function App() {
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handlePhone = (e) => {
    setPhone(e);
  };
  const handleUsername = (e) => {
    setUsername(e);
  };
  const handlePassword = (e) => {
    setPassword(e);
  };

  return (
    <>
      <PhoneContext.Provider value={{ phone, handlePhone }}>
        <UsernameContext.Provider value={{ username, handleUsername }}>
          <PasswordContext.Provider value={{ password, handlePassword }}>
            <Routes>
              <Route exact path="" element={<Home />}></Route>
              {/* <Route path="/login-register" element={<LoginRegister />} />
               */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<Otp />}></Route>
            </Routes>
          </PasswordContext.Provider>
        </UsernameContext.Provider>
      </PhoneContext.Provider>
    </>
  );
}
