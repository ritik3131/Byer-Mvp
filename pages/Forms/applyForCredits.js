import { Button, Typography, Grid, Stack, ListItem } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import WheatPic from "../../../../Resources/wheat.jpeg";
import { getSession } from "../../lib/get-session";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

export default function StoreCategory() {
  const router = useRouter();
  const DataArr = [
    "Udyog Adhar",
    "GST  Certificate",
    "PAN Card",
    "Adhar Number",
    "FSSAI Registration",
    "Current Account Cheque",
    "Shop & Establishment License",
    "Drug License",
    "Other Documents :  ",
  ];
  const OtherDocuments = [
    "( 1. Shop Enrollment Certificate",
    "2. Weight Measurement Certificate",
    "3. Gumasta License",
    " 4.Incorporation Certificate",
    "5. Municipal Corporation Ceritifcate",
    "6.Labour Certificate",
    "7.Gram Panchayat Certificate",
    "8.Enlistment Certificate",
    " 9. Street Vending License",
    "10. Town Committee Trade License )",
  ];

  const [cheque, setCheque] = useState(null);
  const [shop, setShop] = useState(null);
  const [gst, setGst] = useState(null);
  const submitHandler = async () => {
    await axios.post(
      "/api/getCreditAccess",
      {
        CancelCheque: cheque,
        GSTCertificate: gst,
        ShopPhoto: shop,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    router.back();
  };
  return (
    <>
      <Head>
        <title>Byer | Apply For Credits</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <div
        style={{
          width: "100vw",
          backgroundColor: "#31BA2E",
          textAlign: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: "Roboto",
            fontSize: "30px",
            color: "white",
            fontWeight: "900",
          }}
        >
          Apply For Credits
        </Typography>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          //   backgroundColor: "#F5F5F5",
          width: "100vw",
          paddingTop: "40px",
          //   paddingBottom: "42px",
        }}
      >
        <Grid item xs={3}>
          <Stack spacing={`20px`}>
            <Typography style={{ fontWeight: "700", fontSize: "30px" }}>
              Cancel Cheque Copy
            </Typography>
            <input
              type="file"
              onChange={(e) => setCheque(e.target.files[0])}
            ></input>
            <Typography style={{ fontWeight: "700", fontSize: "30px" }}>
              Photo Of Shop and Owner
            </Typography>
            <input
              type="file"
              onChange={(e) => setShop(e.target.files[0])}
            ></input>

            <Typography style={{ fontWeight: "700", fontSize: "30px" }}>
              GST or Shop Certificate
            </Typography>
            <input
              type="file"
              onChange={(e) => setGst(e.target.files[0])}
            ></input>
          </Stack>
        </Grid>
        <Button
          variant="filled"
          // fullWidth
          style={{
            marginTop: "20px",
            backgroundColor: "#31BA2E",
            color: "white",
            marginBottom: "350px",
            padding :"0 30px"
          }}
          onClick={() => submitHandler()}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const { user } = await getSession(req, res);
  if (user === undefined || !user) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  return {
    props: {},
  };
}
