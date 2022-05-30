import { Box } from "@mui/system";
import { Grid, Stack } from "@mui/material";
import { withStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axiosInstance";
import { getSession } from "../../lib/get-session";
import dbConnect from "../../utils/dbConnect";
import retailerModel from "../../models/retailerModel";
import Head from "next/head";
import UnauthRedirect from "../../component/UnauthRedirect";
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

function UserMap({ locations }) {
  const Map = React.useMemo(
    () =>
      dynamic(
        () => import("../../component/map"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );
  return <Map locations={locations} />;
}

function Registration2({ user }) {
  const [locations, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  const router = useRouter();
  const [err, setErr] = useState("");
  const [address, setAddress] = useState("");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");

  if (!user) return <UnauthRedirect />;

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    reverseGeocodeCoordinates(location);
  };

  const reverseGeocodeCoordinates = async (location) => {
    //   const response = await axios(
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDj6soicZdNmUfa1ICfbTLM-lH0VV1RWhU`
    //   );
    //   console.log(response);
    //   const address = response.data.results[0].formatted_address;
    //   setAddress(address);
  };

  const onError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErr("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setErr("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setErr("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setErr("An unknown error occurred.");
        break;
    }
  };

  const findAddressHandler = (e) => {
    e.preventDefault();
    if (!("geolocation" in navigator))
      setErr("Geolocation not supported on your browser");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  const registerRetailerHandler = async () => {
    const body = {
      location: locations,
      shopName,
      ownerName,
      pincode,
      email,
      address,
    };
    console.log("Body", body);
    const response = await axiosInstance.put("/api/retailerRegistration", body);
    if (response.status === 200) {
      router.push("/home");
    }
  };

  return (
    <>
    <Head>
    <title>Byer | Retailer Regristration</title>
    <meta
      name="description"
      content="India's Larget B2B distribution network for business & retailers"
    />
  </Head>
      <Box
        style={{
          marginTop: "",
          backgroundColor: "#F5F5F5",
          paddingTop: "150px",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <Grid item xs={3}>
            <Typography
              style={{
                marginBottom: "90px",
                fontWeight: "800",
                fontSize: "60px",
                marginTop: "-50px",
              }}
            >
              REGISTRATION{" "}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stack
              spacing={`22px`}
              style={{
                backgroundColor: "",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "60vw",
              }}
            >
              <CssTextField
                id="input-with-sx"
                label="Shop Name"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", fontWeight: "800" },
                }}
                inputProps={{ style: { color: "#31BA2E" } }}
                fullWidth
                style={{ boxShadow: "0px 4px 8px -4px black" }}
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <CssTextField
                id="input-with-sx"
                label="Owner Name"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", fontWeight: "800" },
                }}
                inputProps={{ style: { color: "#31BA2E" } }}
                fullWidth
                style={{ boxShadow: "0px 4px 8px -4px black" }}
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />

              <CssTextField
                id="input-with-sx"
                label="Email"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", fontWeight: "800" },
                }}
                inputProps={{ style: { color: "#31BA2E" } }}
                fullWidth
                style={{ boxShadow: "0px 4px 8px -4px black" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CssTextField
                id="input-with-sx"
                label="Pincode"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", fontWeight: "800" },
                }}
                inputProps={{ style: { color: "#31BA2E" } }}
                fullWidth
                style={{ boxShadow: "0px 4px 8px -4px black" }}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <CssTextField
                id="input-with-sx"
                label="Address"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black", fontWeight: "800" },
                }}
                inputProps={{ style: { color: "#31BA2E" } }}
                fullWidth
                style={{ boxShadow: "0px 4px 8px -4px black" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                variant="filled"
                style={{
                  // width: "60vw",
                  marginTop: "20px",
                  backgroundColor: "#31BA2E",
                  color: "white",
                }}
                onClick={findAddressHandler}
              >
                <Typography style={{ fontWeight: "600" }}>
                  Get Location Access
                </Typography>
              </Button>
              {locations.loaded && <UserMap locations={locations} />}
              <Button
                variant="outlined"
                style={{
                  // width: "60vw",
                  marginTop: "20px",
                  backgroundColor: "white",
                  borderColor: "#31BA2E",
                  borderWidth: "2px",
                  color: "#31BA2E",
                  marginBottom: "370px",
                }}
                onClick={registerRetailerHandler}
              >
                <Typography style={{ fontWeight: "600" }}>Register</Typography>
              </Button>
            </Stack>
            {err.length > 0 && <p>{err}</p>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Registration2;

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const { user } = await getSession(req, res);
  if (user === undefined || !user)
    return {
      redirect: {
        destination: `/phone-auth`,
      },
    };
  let retailerId = user._id;
  try {
    const retailer = await retailerModel.findById(retailerId);
    if (
      retailer.ownerName &&
      retailer.email &&
      retailer.shopName &&
      retailer.address &&
      retailer.pincode
    )
      return {
        redirect: {
          destination: `/Shopping`,
        },
      };
  } catch (err) {
    console.log(err);
  }

  return {
    props: { user },
  };
}
