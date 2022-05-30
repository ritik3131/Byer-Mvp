import * as React from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function MiddlePart() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: "200px" }}
      >
        <Grid item xs={3}>
          <Typography
            style={{
              fontFamily: `Roboto`,
              fontStyle: "normal",
              fontSize: `60px`,
              fontWeight: `700`,
            }}
          >
            {" "}
            India's Larget B2B distribution network for business & retailers.{" "}
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems={`center`}
              justifyContent={`center`}
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#31BA2E" }}
                  endIcon={
                    <ArrowRightAltIcon
                      style={{
                        transform: "scale(2)",
                        marginLeft: "-12px",
                        marginRight: "12px",
                      }}
                    />
                  }
                  href='/phone-auth'
                >
                  {" "}
                  <div
                    style={{
                      fontSize: "30px",
                      marginTop: "-6px",
                      marginBottom: "-6px",
                      marginRight: "12px",
                      marginLeft: "12px",
                    }}
                  >
                    {" "}
                    Register
                  </div>
                  {/* Send */}
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              fontFamily: `Roboto`,
              fontStyle: "normal",
              fontSize: `30px`,
              fontWeight: `700`,
              paddingTop: "160px",
            }}
          >
            To Sell Our Products in a distribution network {" "}
            <div style={{ display: "inline-block", color: "#31BA2E" }}>
               click here
            </div>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            style={{
              fontFamily: `Roboto`,
              fontStyle: "normal",
              fontSize: `30px`,
              fontWeight: `700`,
              paddingTop: "50px",
            }}
          >
            To become a BYER mitra to earn Rs 25000{" "}
            <div style={{ display: "inline-block", color: "#31BA2E" }}>
              click here
            </div>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
export default MiddlePart;
