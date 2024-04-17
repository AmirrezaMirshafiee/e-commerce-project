import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register({ handlePage }) {
  // const use = useNavigate();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [err, setErr] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    phone: "",
  });
  // const handleCheck=(async(e)=>{
  //   try{
  //     e.preventDefault();
  //     const res=await fetch("http://localhost:7000/api/v1/auth/register", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ phone, email, username, password, address }),
  //     })
  //     console.log(res)
  //     return res.json()

  //   }catch(error){
  //     console.log(error.message)
  //   }
  // })
  const validate = (e) => {
    e.preventDefault();
    let inputError = {
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    };
    let regexPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    let regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm
    let regexEmail=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    if (!username && !password && !address && !phone && !email) {
       setErr({
        ...inputError,
        username: "Username is required",
        password: "Password is required",
        email: "Email is required",
        phone: "Phone is required",
        address: "Address is required",
       })
    }else if(!regexPassword.test(password)){
       setErr({
        ...inputError,
        password: "password must be 8 characters or more",
      });
    }
    else if(!regexPhone.test(phone)){
       setErr({
        ...inputError,
        phone: "phone number invalid",
      });
    }
    else if(!regexEmail.test(email)){
       setErr({
        ...inputError,
        email: "email invalid",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={validate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  value={username}
                  onChange={(i) => setUserName(i.target.value)}
                />
                <Typography variant="body2" sx={{ color: "red" }}>
                  {err.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(i) => setEmail(i.target.value)}
                />
                <Typography variant="body2" sx={{ color: "red" }}>
                  {err.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone "
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(i) => setPhone(i.target.value)}
                />
                                <Typography variant="body2" sx={{color:'red'}}>{err.phone}</Typography>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(i) => setAddress(i.target.value)}
                />
                                <Typography variant="body2" sx={{color:'red'}}>{err.address}</Typography>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(i) => setPassword(i.target.value)}
                />
                                <Typography variant="body2" sx={{color:'red'}}>{err.password}</Typography>

              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handlePage} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
