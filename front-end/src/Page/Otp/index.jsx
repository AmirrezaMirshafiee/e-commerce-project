import { Button, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown, { zeroPad } from "react-countdown";
import PhoneContext from "../../utils/loginContext";
import UsernameContext from "../../utils/usernameContext";
import PasswordContext from "../../utils/passwordContext";

export default function Otp() {
  const [code, setCode] = useState("");
  const { phone } = useContext(PhoneContext);
  const { username } = useContext(UsernameContext);
  const { password } = useContext(PasswordContext);
  const use = useNavigate();
  // const phone = localStorage.getItem("phone");
  const Completionist = () => <Button variant="contained" onClick={resendCode}>Resend Code</Button>;
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
        toast.error("Wrong code", {
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

  const resendCode = async (i) => {
    try {
      i.preventDefault();
      const res = await fetch("http://localhost:7000/api/v1/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.status === "success") {
        toast.success("Code was sent", {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
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
        <Link to="/login">
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
