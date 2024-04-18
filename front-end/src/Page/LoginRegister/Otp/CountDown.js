import { Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes <= 10) minutes = "0" + minutes;
  if (seconds <= 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};
export default function CountDown({ seconds }) {
  const [Countdown, setCountdown] = useState(seconds);
  const timeId = useRef();
  useEffect(() => {
    timeId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, []);
  useEffect(() => {
    if (Countdown <= 0) {
      clearInterval(timeId.current);
      alert("END");
    }
  }, [Countdown]);
  return <Typography variant="h4">{formatTime(Countdown)}</Typography>;
}
