import { Button, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneContext from "../../../utils/PhoneContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown, { zeroPad } from "react-countdown";

export default function Otp() {
  const [code, setCode] = useState("");
  const { registerPhone } = useContext(PhoneContext);
  const use = useNavigate();
  const phone = localStorage.getItem("phone");
  const Completionist = () => <Button onClick={resendCode}>Resend Code</Button>;
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <Typography>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </Typography>
      );
    }
  };
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
    } catch (err) {
      console.log(err);
    }
  };
  const resendCode = async (i) => {
    try {
      i.preventDefault();
      const sendMessage = await fetch("https://api.limosms.com/api/sendcode", {
        method: "POST",
        body: JSON.stringify({
          Mobile: phone,
          Footer: `Resend code`,
        }),
        headers: {
          "Content-Type": "application/json",
          ApiKey:'99dab280-f034-41f9-9c86-31d977f840fe',
        },
      })
      const dataMessage = await sendMessage.json();

      
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
          Please Enter SMS Code Sent to {phone}
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
        <Stack flexDirection="row">
          <Button
            variant="contained"
            size="large"
            type="submit"
            onClick={handleOtp}
          >
            Check Code
          </Button>
          <Button
            disableRipple="false"
            sx={{
              backgroundColor: "#000416",
              "&:hover": {
                backgroundColor: "#000416",
                cursor: "default",
              },
            }}
          >
            {" "}
            <Countdown date={Date.now() + 10000} renderer={renderer} />
          </Button>
        </Stack>
        <Link to="/login-register">
          <Button sx={{ marginTop: "20px" }}>Back to Login</Button>
        </Link>
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
      </Stack>
    </>
  );
}
