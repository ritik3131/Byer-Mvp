import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import LogoSVG from "../../Resources/logo.svg";
import NewSearchBar from "../../component/newSearchBar";
import TableR from "../../component/Table7";
import dbConnect from "../../utils/dbConnect";
import Retailers from "../../models/retailerModel";
import Orders from "../../models/orderModel";
import { getSession } from "../../lib/get-session";

export default function AdminPanel2({ orders }) {
  function createTempHeading(order) {
    return {
      orderId: order.id,
      products: order.products,
      retailerName: order.retailerName,
      storeName: order.storeName,
      number: order.number,
      address: order.address,
      orderValue: order.orderValue,
      orderStatus: order.orderRejected ? "Rejected" : "Accepted",
      deliveryStatus: order.deliveryStatus,
      paymentStatus: order.paymentStatus,
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
            All Orders
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
      <TableR functionHeading={createTempHeading} data={orders} />
    </>
  );
}

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
  let orders;
  let ordersData = [];
  try {
    orders = await Orders.find({});
    ordersData = await Promise.all(
      orders.map(async (ord) => {
        async function fun(ord) {
          const user = await Retailers.findOne({ _id: ord.retailerId });
          return user;
        }
        let user = await fun(ord);
        return {
          id: ord._id.toString(),
          products: ord.products.length,
          retailerName: user.ownerName,
          storeName: user.shopName,
          address: user.address,
          number: user.number,
          orderValue: ord.totalAmount,
          orderRejected: ord.orderRejected,
          deliveryStatus: ord.deliveryStatus,
          paymentStatus: ord.paymentStatus,
        };
      })
    );
  } catch (error) {}
  return {
    props: {
      orders: JSON.parse(JSON.stringify(ordersData)),
    },
  };
}
