import { Box } from "@mui/system";
import { Card, Grid, List, Stack } from "@mui/material";
import { withStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Topbar from "../../component/topBar";
import RetailerPhotoCard from "../../component/RetailerPhotoCard";
import dbConnect from "../../utils/dbConnect";
import Retailers from "../../models/retailerModel";
import mongoose from "mongoose";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "../../lib/get-session";

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

function Registration2({ retailer }) {
  const router = useRouter();
  const pastOrdersHandler = () => {
    router.push(`/Admin/orders/${retailer._id}`);
  };
  const applyForCreaditsHandler = () => {
    router.push(`/Forms/applyForCredits`);
  };
  return (
    <>
      <Head>
        <title>Byer | Profile</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <div style={{ position: "relative", zIndex: 100 }}>
        <Topbar style={{ zIndex: 32 }} />
      </div>
      <Grid container spacing={`50px`}>
        <Grid item xs={12} md={6}>
          <Stack
            spacing={`22px`}
            style={{
              backgroundColor: "",
              // width: "60vw",
              // paddingTop: "30px",
              padding: "10px 14px",
              // maxWidth: "40vw",
            }}
          >
            <CssTextField
              // id="input-with-sx"
              label="Shop Name"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={retailer.shopName}
            />
            <CssTextField
              // id="input-with-sx"
              label="Retailer Name"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={retailer.ownerName}
            />

            <CssTextField
              // id="input-with-sx"
              label="Address"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={retailer.address}
            />

            <CssTextField
              // id="input-with-sx"
              label="Phone Number"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={retailer.number}
            />
            <CssTextField
              // id="input-with-sx"
              label="Email Id"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              fullWidth
              style={{ boxShadow: "0px 4px 8px -4px black" }}
              value={retailer.email}
            />

            {/* <CssTextField
              // id="input-with-sx"
              label="Store Category"
              variant="outlined"
              InputLabelProps={{
                style: { color: "black", fontWeight: "800" },
              }}
              inputProps={{ style: { color: "#31BA2E" } }}
              style={{ boxShadow: "0px 4px 8px -4px black" }}
            /> */}
          </Stack>
          {/* </Grid> */}
          {/* </Grid> */}
          {/* </Box> */}
        </Grid>
        <Grid item xs={12} md={6} style={{}}>
          {/* <Card sx={{ width: 1 }}>ok</Card> */}
          <List spacing={`20px`} style={{ margin: "0 14px" }}>
            <RetailerPhotoCard />
            <div style={{ margin: " 0 50px", paddingTop: "20px" }}>
              <Button
                onClick={() => pastOrdersHandler()}
                variant="outlined"
                style={{
                  backgroundColor: "#31BA2E",
                  color: "white",
                  fontWeight: 700,
                }}
                fullWidth={true}
              >
                Past Orders
              </Button>
            </div>
            <div style={{ margin: " 0 50px", paddingTop: "20px" }}>
              <Button
                onClick={() => applyForCreaditsHandler()}
                variant="outlined"
                style={{
                  backgroundColor: "#31BA2E",
                  color: "white",
                  fontWeight: 700,
                }}
                fullWidth={true}
              >
                Apply For Credits
              </Button>
            </div>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  const { retailerId } = context.query;
  let retailer;
  try {
    retailer = await Retailers.findOne({
      _id: mongoose.Types.ObjectId(retailerId),
    });
  } catch (error) {
    console.log({ "The error is": error });
  }
  return {
    props: {
      retailer: JSON.parse(JSON.stringify(retailer)),
    },
  };
}

export default Registration2;
