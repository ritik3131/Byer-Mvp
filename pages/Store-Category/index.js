import { Button, Typography, Grid, Stack, ListItem } from "@mui/material";
import WheatPic from "../../Resources/wheat.jpeg";
import Head from "next/head";
export default function StoreCategory() {
  return (
    <>
      <Head>
        <title>Byer | Store Category</title>
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
          Store Category
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
          paddingBottom: "690px",
        }}
      >
        <Grid item xs={3} style={{ width: "100vw" }}>
          <Button
            startIcon={
              <img
                src={WheatPic.src}
                width={WheatPic.width}
                height={WheatPic.height}
              />
            }
            fullWidth={true}
            variant="outlined"
            style={{ borderColor: "#f5f5f5" }}
          >
            <Stack>
              <ListItem>
                <Typography
                  style={{
                    color: "black",
                    fontSize: "20px",
                    marginTop: "-20px",
                  }}
                >
                  Food & Grocery
                </Typography>
              </ListItem>

              <ListItem>
                <Typography
                  style={{
                    color: "black",
                    fontSize: "15px",
                    marginTop: "-20px",
                  }}
                >
                  Food-Staple,FMCG,Fruits & Vegitables & Meat
                </Typography>
              </ListItem>
            </Stack>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
