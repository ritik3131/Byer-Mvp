import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import LogoSVG from "../../../Resources/logo.svg";
import NewSearchBar from "../../../component/newSearchBar";
import TableR from "../../../component/Table4";
import dbConnect from "../../../utils/dbConnect";
import Retailers from "../../../models/retailerModel";
import Orders from "../../../models/orderModel";
import mongoose from "mongoose";
import { getSession } from "../../../lib/get-session";

function AdminPanel4({
  orders,
  totalNumberOfOrders,
  totalValue,
}) {
  function createTempHeading(order) {
    return {
      orderID: order._id,
      Date: order.date,
      TotalOrderValue: order.TotalOrderValue,
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
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#31BA2E",
                  color: "white",
                  fontWeight: 700,
                  padding: "0 40px",
                  margin: "40px",
                }}
              >
                Past Orders
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TableR functionHeading={createTempHeading} data={orders} retailerOrderDetail={true} />
      <div style={{margin:"10px 50px"}}>Total Number Of Orders :&nbsp;{totalNumberOfOrders}</div>
      <div style={{margin:"10px 50px"}}>Total Value : &nbsp;{totalValue}</div>
    </>
  );
}

export default AdminPanel4;

export async function getStaticProps(context) {
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
  let orders;
  let totalNumberOfOrders = 0;
  let totalValue = 0;
  let orderData = [];
  try {
    retailer = await Retailers.findOne({
      _id: mongoose.Types.ObjectId(retailerId),
    });

    orders = retailer.order;
    totalNumberOfOrders = orders.length;
    orderData = await Promise.all(
      orders.map(async (ord) => {
        async function fun(ord) {
          const order = await Orders.findOne({
            _id: mongoose.Types.ObjectId(ord),
          });
          return order;
        }
        let ORDER = await fun(ord);
        if (!ORDER.orderRejected) totalValue += ORDER.totalAmount;
        return {
          _id: ORDER._id.toString(),
          TotalOrderValue: ORDER.totalAmount,
          date: ORDER.createdAt,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orderData ? orderData : [])),
      totalValue,
      totalNumberOfOrders,
    },
  };
}
