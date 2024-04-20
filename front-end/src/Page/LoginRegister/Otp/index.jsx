import { Button, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import CountDown from "./CountDown";
import PhoneContext from "../../../utils/PhoneContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Otp() {
  const [code, setCode] = useState("");
  const { registerPhone } = useContext(PhoneContext);
  const use = useNavigate();
  const phone = localStorage.getItem("phone");

  const handleOtp = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:7000/api/v1/auth/otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          phone,
          code,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("login successful", {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          use("/");
        }, 2500);
      } else {
        toast.error("Please enter correct code", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Stack
        sx={{
          backgroundColor: "#000416",
          width: "100%",
          height: "100vh",
          mx: "auto",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "10px", color: "white" }}>
          Please Enter SMS Code
        </Typography>
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={6}
          renderSeparator={
            <span style={{ color: "white", fontSize: "40px" }}>-</span>
          }
          renderInput={(props) => <input {...props} />}
          inputStyle={{ padding: "10px", color: "black", fontSize: "20px" }}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ width: "10%", marginTop: "10px" }}
          onClick={handleOtp}
        >
          Check Code
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Typography variant="h4" sx={{ marginBottom: "10px", color: "white" }}>
          HI {<CountDown seconds={120} />}
        </Typography>
      </Stack>
    </>
  );
}
