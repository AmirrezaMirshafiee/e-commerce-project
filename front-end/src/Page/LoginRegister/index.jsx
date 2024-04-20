import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Otp from "./Otp";

export default function LoginRegister() {
  const [pageType, setPageType] = useState("login");
  const [number, setNumber] = useState(null);
  const handlePage = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };
  

  const getFromChild = (phone) => {
    setNumber(phone);
    // console.log(phone);
  };
  
  return (
    <>
      {pageType === "login" ? (
        <Login handlePage={handlePage} />
      ) : (
        <Register handlePage={handlePage} getFromChild={getFromChild} />
      )}
    </>
  );
}
