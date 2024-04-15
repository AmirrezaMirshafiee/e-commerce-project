import { Button, Stack, Typography } from "@mui/material";
import React, {  useState } from "react";
import OtpInput from "react-otp-input";
import CountDown from "./CountDown";
export default function Otp() {
  const [otp, setOtp] = useState("");
  


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
        >
          Check Code
        </Button>
        <Typography variant="h4" sx={{ marginBottom: "10px", color: "white" }}>
         HI {<CountDown seconds={120}/>}
        </Typography>
      </Stack>
    </>
  );
}
