import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginRegister() {
  const [pageType, setPageType] = useState("login");
  const handlePage = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };
  return (
    <>
      {pageType === "login" ? (
        <Login handlePage={handlePage} />
      ) : (
        <Register handlePage={handlePage} />
      )}
    </>
  );
}
