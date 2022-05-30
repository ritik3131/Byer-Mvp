import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import LogoSVG from "../../Resources/logo.svg";
import NewSearchBar from "../../component/newSearchBar";
import TableR from "../../component/Table2";
import dbConnect from "../../utils/dbConnect";
import Retailers from "../../models/retailerModel";
import { getSession } from "../../lib/get-session";

function AdminPanel2({ retailers }) {
  console.log(retailers);
  function createTempHeading(retailer) {
    return {
      userID: retailer._id,
      MobileNumber: retailer.number,
      RetailerName: retailer.ownerName,
      StoreName: retailer.shopName,
      CreditStatus: retailer.creditStatus ? "Applied" : "Not applied",
      KYCVerificationStatus: retailer.kycVerificationStatus
        ? "Verified"
        : "Not verified",
      ViewDocs: "ViewDocs",
    };
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, paddingTop: "20px" }}>
        <AppBar
          elevation={0}
          position="static"
          style={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={LogoSVG.src}
                alt="SVG logo image"
                height="61px"
                width="127px"
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <Grid
          item
          xs={6}
          md={3}
          style={{
            textAlign: "center",
            backgroundColor: "",
            marginTop: "30px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#31BA2E",
              color: "white",
              fontWeight: 700,
              padding: "0 40px",
            }}
          >
            User
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          style={{
            textAlign: "center",
          }}
        >
          <NewSearchBar allCategories={false} />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{
            textAlign: "center",
            // backgroundColor: "yellow",
            paddingTop: "30px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#31BA2E",
              color: "white",
              fontWeight: 700,
              padding: "0 40px",
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Search Category
          </Button>
        </Grid>
      </Grid>
      <TableR functionHeading={createTempHeading} data={retailers} />
    </>
  );
}

export default AdminPanel2;

export async function getStaticProps(context) {
  await dbConnect();
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user || !user.isAdmin) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  let users;
  let retailers;
  try {
    users = await Retailers.find({});
    retailers = users.filter((user) => !user.isAdmin);
  } catch (error) {}
  return {
    props: {
      retailers: JSON.parse(JSON.stringify(retailers)),
    },
  };
}
