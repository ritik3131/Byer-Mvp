import {Grid, ListItem, Stack} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Button, Typography} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import {useRouter} from "next/router";
import Head from "next/head";

function Uploadx(props) {
  const router = useRouter();
  var imageUrl = null;
  const uploadFileHandler = async () => {
    if (imageUrl) {
      let formData = new FormData();
      formData.append("UdyamAadhar", imageUrl);
      await axios.post(`/api/uploadFile`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      // setImageUrl(null);
      imageUrl = null;
      router.push("/Shopping");
    }
  };
  const imageChangeHandler = (e) => {
    // setImageUrl(e.target.files[0]);
    imageUrl = e.target.files[0];
  };

  return (
    <>
      <Head>
        <title>Byer | Files upload for KYC</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          width: "100vw",
          paddingTop: "40px",
        }}
      >
        <Grid item xs={3} style={{}}>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={imageChangeHandler}
            />
            <IconButton
              style={{backgroundColor: "#f5f5f5", transform: "scale(1.4)"}}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera style={{color: "black"}} />
            </IconButton>
          </label>
        </Grid>
        <div style={{paddingTop: "12px", color: "grey"}}>
          Using Camera Gallery or Files
        </div>
        <Button
          variant="filled"
          style={{
            width: "60vw",
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={uploadFileHandler}
        >
          <Typography style={{fontWeight: "600"}}>Upload</Typography>
        </Button>
        <div style={{paddingTop: "12px", color: "grey"}}>
          Udyam Aadhar vShoppingerifies in 10 mins...
        </div>
        <Box>
          <Typography>
            Certificate must clearly show
            <Stack>
              {["Registration Number", "Legal Name", "Trade Name"].map(
                (elem, index) => {
                  return (
                    <>
                      <ListItem key={index} >
                        {" "}
                        <CheckIcon style={{color: "green"}} /> {elem}
                      </ListItem>
                    </>
                  );
                }
              )}
            </Stack>
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
export default Uploadx;
// export async function getStaticProps({ params: {slug} }) {
//   // ↓add 
//   console.log(`Building slug: ${slug}`)
// }
