import { Button, Typography } from "@mui/material";
import TopBar from "../../component/topBar";
import { Stack } from "@mui/material";
import { ListItem } from "@mui/material";
import BreadCrumb from "../../component/BreadCrumb";
import { Grid } from "@mui/material";
import Head from "next/head";
import DeliveryAdrress from "../../component/DeliveryAdress";
import Payement from "../../component/Payment-OD";
import InvoiceCard from "../../component/InvoiceCard";
import ProductDetail from "../../component/ProductDetail";
import { getSession } from "../../lib/get-session";
import UnauthRedirect from "../../component/UnauthRedirect";
import dbConnect from "../../utils/dbConnect";
import orderModel from "../../models/orderModel";
import Product from "../../models/productModel";
import { useRouter } from "next/router";
import axios from "axios";
function Home({ order, products, user }) {
  const router = useRouter();
  if (!user) return <UnauthRedirect />;
  const routerToInvoicePageHandler = (filepath) => {
    router.push({
      pathname: "/Order-Views/viewInvoice",
      query: {
        filepath: filepath,
      },
    });
  };
  const due =
    order.paymentStatus === "0%"
      ? order.totalAmount
      : order.paymentStatus === "10%"
      ? order.totalAmount
      : order.isFullAmountPaid
      ? 0
      : 0.9 * order.totalAmount;
  const reOrderHandler = async () => {
    const body = {
      isPickup: localStorage.getItem("deliveryOptions") === "self",
      isFullAmountPaid: localStorage.getItem("isFullAmountPaid") === "1",
      totalAmount: order.totalAmount,
    };
    // console.log(body);
    router.push("/Delivery-Details-2");
    await axios.post("/api/order/newOrder", body);
  };
  return (
    // <></>
    <div style={{ overflowX: "hidden" }}>
      <Head>
        <title>Byer | Order Details</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <ListItem style={{ zIndex: 10 }}>
        <TopBar />
      </ListItem>
      <ListItem
        style={{
          marginLeft: "22px",
        }}
      >
        <BreadCrumb />
      </ListItem>
      <ListItem
        style={{
          paddingTop: "20px",
          marginLeft: "42px",
          fontSize: "30px",
          fontWeight: "700",
        }}
      ></ListItem>
      <Grid container spacing={`4px`} style={{ padding: "32px" }}>
        <Grid item xs={12} md={6}>
          <Stack>
            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                // fontWeight: "700",
              }}
            >
              <InvoiceCard
                heading={order._id}
                time={order.createdAt.toString()}
                amount={order.totalAmount.toFixed(2)}
                status={order.paymentStatus}
                button={false}
                orderId={order._id}
                onRouter={routerToInvoicePageHandler}
              />
            </ListItem>
            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              Product Details
            </ListItem>

            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                // fontWeight: "700",
              }}
            >
              {products.map((product) => (
                <ProductDetail
                  key={product._id}
                  qty={product.qty}
                  productName={product.productId.productName}
                  price={product.productId.price.toFixed(2)}
                  button={false}
                />
              ))}
            </ListItem>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} style={{}}>
          <Stack>
            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                // fontWeight: "700",
              }}
            >
              <DeliveryAdrress
                heading={`Delivery Address`}
                name={user.ownerName}
                number={user.number}
                deliveryAddress={order.deliveryAddress}
                orderId={order._id}
                button={false}
              />
            </ListItem>
            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                // fontWeight: "700",
              }}
            >
              <Payement
                totalPay={order.totalAmount.toFixed(2)}
                due={due.toFixed(2)}
                heading={`Payment`}
                button={false}
              />
            </ListItem>
            <ListItem
              style={{
                paddingTop: "20px",
                fontSize: "30px",
                // fontWeight: "700",
              }}
            >
              <Button
                variant="filled"
                fullWidth
                style={{
                  marginTop: "20px",
                  backgroundColor: "#31BA2E",
                  color: "white",
                  marginBottom: "350px",
                  // marginRight:" auto"
                  // width:"70vw"
                }}
                onClick={reOrderHandler}
              >
                <Typography style={{ fontWeight: "600" }}>Re-Order</Typography>
              </Button>
            </ListItem>
          </Stack>
          {/* <OrderDetailsWithPay /> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  await dbConnect();
  const { req, res } = context;
  const { user } = await getSession(req, res);
  const { orderId } = context.query;
  if (user === undefined || !user)
    return {
      redirect: {
        destination: `/home`,
      },
    };
  let retailerId = user._id;
  let order, prod;
  try {
    const orders = await orderModel.findOne({
      retailerId: retailerId,
      _id: orderId,
    });
    let { products } = await orders.populate(`products.0.productId`);
    order = orders;
    prod = products;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order ? order : null)),
      products: JSON.parse(JSON.stringify(prod ? prod : null)),
      user: user,
    },
  };
}
