import * as React from "react";
import TopBar from "../../component/topBar";
import { Stack } from "@mui/material";
import { ListItem } from "@mui/material";
import BreadCrumb from "../../component/BreadCrumb";
import CartCard from "../../component/CartCard";
import { Grid } from "@mui/material";
import OrderDetailsWithPay from "../../component/OrderDetailsWithPayment";
import DeliveryAdrress from "../../component/DeliveryAdress";
import orderModel from "../../models/orderModel";
import { getSession } from "../../lib/get-session";
import dbConnect from "../../utils/dbConnect";
import Head from "next/head";
import Link from "next/link";
function Home({
  deliveryAddress,
  orderId,
  user,
  cartTotal,
  name,
  number,
  tax,
  deliveryCharge,
  isFullAmountPaid,
}) {
  const size = useWindowSize();
  const width = size.width;
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
    });

    React.useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  if (!deliveryAddress || !orderId || !cartTotal) {
    return (
      <div>
        <h2>You do not have any order </h2>
        <p>To Order </p>
        <Link href="/Shopping">Shop</Link>
      </div>
    );
  }

  if (!user)
    return (
      <div>
        <h2>You are not authorised to this </h2>
        <p>To see this </p>
        <Link href="/api/phone-auth">Login</Link>
      </div>
    );

  return (
    <div style={{ overflowX: "hidden" }}>
      <Head>
        <title>Byer | Delivery and Payment Details</title>
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
        {width > 520 && <BreadCrumb />}
        {/* <BreadCrumb /> */}
      </ListItem>
      <ListItem
        style={{
          paddingTop: "20px",
          marginLeft: "42px",
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        {/* Delivery Address */}
      </ListItem>
      <Grid container spacing={`4px`}>
        <Grid item xs={12} md={6}>
          <ListItem
            style={{
              paddingTop: "20px",
              // marginLeft: "42px",
              fontSize: "30px",
              // fontWeight: "700",
            }}
          >
            {/* <CartCard /> */}
            {/* <ButtonWithCheckBox /> */}
            <DeliveryAdrress
              name={name}
              heading={`Delivery Address`}
              number={number}
              deliveryAddress={deliveryAddress}
              orderId={orderId}
              button={false}
              changeAddress={true}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <ListItem>
            <OrderDetailsWithPay
              deliveryPage={true}
              cartTotal={cartTotal}
              checkbox={false}
              tax={tax}
              deliveryCharge={deliveryCharge}
              isFullAmountPaid={isFullAmountPaid}
            />
          </ListItem>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();

  const { user } = await getSession(req, res);
  if (user === undefined || !user)
    return {
      redirect: {
        destination: `/`,
      },
    };

  const retailerId = user._id;
  let deliveryAddress,
    orderId,
    cartTotal,
    tax,
    deliveryCharge,
    isFullAmountPaid;
  const name = user.ownerName;
  const number = user.number;
  try {
    const retailerOrders = await orderModel.find({ retailerId: retailerId });
    deliveryAddress =
      retailerOrders[retailerOrders.length - 1].deliveryAddress.toString();
    orderId = retailerOrders[retailerOrders.length - 1]._id.toString();
    tax = retailerOrders[retailerOrders.length - 1].tax.toString();
    cartTotal = retailerOrders[retailerOrders.length - 1].totalAmount;
    deliveryCharge = retailerOrders[retailerOrders.length - 1].deliveryCharge;
    isFullAmountPaid =
      retailerOrders[retailerOrders.length - 1].isFullAmountPaid;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      deliveryAddress: JSON.parse(
        JSON.stringify(deliveryAddress ? deliveryAddress : null)
      ),
      name: JSON.parse(JSON.stringify(name ? name : null)),
      tax: JSON.parse(JSON.stringify(tax ? tax : null)),
      number: JSON.parse(JSON.stringify(number ? number : null)),
      orderId: JSON.parse(JSON.stringify(orderId ? orderId : null)),
      cartTotal: JSON.parse(JSON.stringify(cartTotal ? cartTotal : null)),
      deliveryCharge: JSON.parse(
        JSON.stringify(deliveryCharge ? deliveryCharge : 0)
      ),
      isFullAmountPaid: JSON.parse(JSON.stringify(isFullAmountPaid)),
      user,
    },
  };
}

export default Home;
