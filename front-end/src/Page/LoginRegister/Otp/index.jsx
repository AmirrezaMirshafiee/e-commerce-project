import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import CountDown from "./CountDown";
export default function Otp({phone}) {
  const [otp, setOtp] = useState("");
  const [num, setNum] = useState(phone);
  

const handleOtp = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:7000/api/v1/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Mobile:num,
          code:otp
        }),
      });
      const data = await res.json();
      if(data.status==='success'){
        alert('yy')
      }
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(otp)
  console.log(num)

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
          value={otp}
          onChange={setOtp}
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
        <Typography variant="h4" sx={{ marginBottom: "10px", color: "white" }}>
          HI {<CountDown seconds={120} />}
        </Typography>
      </Stack>
    </>
  );
}
