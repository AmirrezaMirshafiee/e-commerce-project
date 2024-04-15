import React from "react";
import LoginRegister from "./Page/LoginRegister";
import { Route, Routes } from 'react-router-dom'


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login-register" element={<LoginRegister />} />
      </Routes>
      
    </>
  );
}
