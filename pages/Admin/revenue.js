import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import LogoSVG from "../../Resources/logo.svg";
import NewSearchBar from "../../component/newSearchBar";
import TableR from "../../component/Table6";
import dbConnect from "../../utils/dbConnect";
import Retailers from "../../models/retailerModel";
import Orders from "../../models/orderModel";
import Products from "../../models/productModel";
import mongoose from "mongoose";
import { getSession } from "../../lib/get-session";

export default function AdminPanel4({ total, monthly, weekly, today }) {
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
                Revenue
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TableR data={{ total, monthly, weekly, today }} />
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user || !user.isAdmin) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  Date.prototype.getWeek = function () {
    var dt = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7);
  };
  let orders;
  var total = 0,
    monthly = 0,
    weekly = 0,
    today = 0;
  try {
    orders = await Orders.find({});
    let successfulOrders = orders.filter((order) => {
      return order.orderRejected === false;
    });

    await Promise.all(
      successfulOrders.map(async (ord) => {
        async function findOrder(ord) {
          const order = await Orders.findOne({
            _id: mongoose.Types.ObjectId(ord),
          });
          return order;
        }
        async function findRevenue(productId) {
          const prod = await Products.findOne({
            _id: mongoose.Types.ObjectId(productId),
          });
          const actualPrice =
            prod.price / (1 + prod.tax / 100 + (1 + prod.commission / 100));
          const revenue = actualPrice * (prod.commission / 100);
          return revenue;
        }

        let order = await findOrder(ord);
        var todayDate = new Date();
        var orderDate = order.createdAt;

        await Promise.all(
          order.products.map(async (prod) => {
            const revenuePerPiece = await findRevenue(prod.productId);
            total = total + revenuePerPiece * prod.qty;
            if (todayDate.getFullYear() === orderDate.getFullYear()) {
              if (todayDate.getMonth() === orderDate.getMonth()) {
                monthly = monthly + revenuePerPiece * prod.qty;
                if (todayDate.getWeek() === orderDate.getWeek()) {
                  weekly = weekly + revenuePerPiece * prod.qty;
                  if (todayDate.getDay() === orderDate.getDay()) {
                    today = today + revenuePerPiece * prod.qty;
                  }
                }
              }
            }
          })
        );
      })
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: { total, monthly, weekly, today },
  };
}
