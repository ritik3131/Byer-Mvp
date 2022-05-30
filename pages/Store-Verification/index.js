import { Button, Typography, Grid, Stack, ListItem } from "@mui/material";
import Head from "next/head";
export default function StoreCategory() {
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
  return (
    <><Head>
    <title>Byer | Store Verification KYC</title>
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
          style={{ fontFamily: "Roboto", fontSize: "30px", color: "white" }}
        >
          Store Verification
        </Typography>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: "#F5F5F5",
          width: "100vw",
          paddingTop: "40px",
        //   paddingBottom: "42px",
        }}
      >
        <Grid item xs={3} style={{}}>
          <Typography style={{ fontSize: "40px", fontWeight: "800" }}>
            UPLOAD SHOP KYC
          </Typography>
        </Grid>
        <Stack>
          {DataArr.map((elem) => {
            return (
              <>
                <ListItem>
                  <Typography style={{ fontWeight: "700" }}>{elem}</Typography>
                </ListItem>
              </>
            );
          })}
        </Stack>
        <Stack>
          {OtherDocuments.map((elem) => {
            return (
              <>
                <ListItem>
                  <Typography style={{ fontWeight: "700" }}>{elem}</Typography>
                </ListItem>
              </>
            );
          })}
        </Stack>
        <Button
          variant="filled"
          style={{
            width: "80vw",
            marginTop: "20px",
            backgroundColor: "#31BA2E",
            color: "white",
marginBottom:"20px" 
          }}
          href="/Store-Verification/Upload"
        >
          <Typography style={{ fontWeight: "600" , }}>
           Manual Verification 
          </Typography>
        </Button>
      </Grid>
    </>
  );
}
