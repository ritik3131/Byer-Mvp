import { Button, Grid, TextField, Typography } from "@mui/material";
import IndiaSVG from "../../Resources/india.svg";
import MobileWithEmail from "../../Resources/MobileEmail.jpeg";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import * as React from "react";
import { authentication } from "../../firebase/firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OtpInput from "react-otp-input";
import Head from "next/head";
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#31BA2E",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#31BA2E",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#31BA2E",
      },
      "&:hover fieldset": {
        borderColor: "#31BA2E",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#31BA2E",
      },
    },
  },
})(TextField);
function Registration1() {
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();
  const generateRecatcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };
  function getVerificationOtpHandler(e) {
    e.preventDefault();
    if (phone.length === 10) {
      generateRecatcha();
      const phoneNo = "+91" + phone;
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNo, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOtp(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const sendUser = async (user) => {
    await axios.post("/api/newRetailer", user);
  };

  const verifyOtp = (otp) => {
    const eotp = otp;
    setOtp(eotp);

    if (eotp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(eotp)
        .then((result) => {
          const user = result.user;
          sendUser(user);
          router.push("/retailer-registration-form");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <><Head>
    <title>Byer | Login</title>
    <meta
      name="description"
      content="India's Larget B2B distribution network for business & retailers"
    />
  </Head>
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <Grid item xs={3}>
          <img src={MobileWithEmail.src} alt="Sorry Image Not Available" />
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              fontFamily: "Roboto",
              fontWeight: "700",
              fontSize: "22px",
              lineHeight: "40px",
            }}
          >
            {showOtp
              ? "Enter the Verifcation Code"
              : " Enter Your Mobile Number"}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              fontFamily: "Roboto",
              fontWeight: "700",
              fontSize: "16px",
              lineHeight: "40px",
              marginLeft: "12px",
            }}
          >
            {!showOtp &&
              "Enter Your 10-digit mobile number to receive the verification code."}
          </Typography>
        </Grid>
        {!showOtp ? (
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginTop: "32px" }}
          >
            <img
              src={IndiaSVG.src}
              alt="Sorry no image available"
              style={{
                display: "inline-block",
                marginBottom: "17px",
                marginRight: "4px",
              }}
              heigh="32px"
              width="32px"
            />
            <Typography
              style={{
                marginBottom: "12px",
                fontSize: "22px",
                marginRight: "12px",
                //   color: "#31BA2E",
                fontWeight: "800",
              }}
            >
              {" "}
              +91
            </Typography>
            <CssTextField
              id="input-with-sx"
              label="Mobile Number"
              variant="outlined"
              InputLabelProps={{ style: { color: "black", fontWeight: "800" } }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
        ) : (
          <OtpInput
            value={otp}
            onChange={verifyOtp}
            numInputs={6}
            separator={<span>&nbsp;&nbsp;- &nbsp;&nbsp; </span>}
            inputStyle={{ height: "50px", width: "45px" }}
          />
        )}

        <Grid item xs={3} style={{ minWidth: "300px" }}>
          <Button
            variant="filled"
            fullWidth
            style={{
              marginTop: "20px",
              backgroundColor: "#31BA2E",
              color: "white",
              marginBottom: "350px",
            }}
            onClick={getVerificationOtpHandler}
          >
            <Typography style={{ fontWeight: "600" }}>
              {showOtp ? "Login" : "Get Verification Code"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <div id="recaptcha-container"></div>
    </div>
    </>
  );
}
export default Registration1;
