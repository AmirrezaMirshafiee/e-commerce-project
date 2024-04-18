import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import CountDown from "./CountDown";
export default function Otp() {
  const [otp, setOtp] = useState("");

const handleOtp = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("https://api.limosms.com/api/checkcode", {
        method: "POST",
        headers: {
          ApiKey: '99dab280-f034-41f9-9c86-31d977f840fe',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code:otp
        }),
      });
      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(otp)

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
