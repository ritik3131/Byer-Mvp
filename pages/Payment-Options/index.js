import * as React from "react";
import TopBar from "../../component/topBar";
import { Stack } from "@mui/material";
import { ListItem } from "@mui/material";
import BreadCrumb from "../../component/BreadCrumb";
import CartCard from "../../component/CartCard";
import { Grid } from "@mui/material";
import OrderDetailsWithPay from "../../component/OrderDetailsWithPayment";
import ButtonWithCheckBox from "../../component/ButtonWithCheckBox";
import { useState } from "react";
import orderModel from "../../models/orderModel";
import { getSession } from "../../lib/get-session";
import dbConnect from "../../utils/dbConnect";
import Head from "next/head";
import Link from "next/link";
function Home({ cartTotal, orderId, user, deliveryCharge, isFullAmountPaid }) {
    const [checked, setChecked] = useState(0);
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
  const checkedValueHandler = (check) => {
    setChecked(check);
  };
  const size = useWindowSize();
  const width = size.width;
  if (!orderId || !cartTotal) {
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
    <>
      <Head>
        <title>Byer | Payment Options</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <div
        style={{
          margin: "10px 20px",
        }}
      >
        <ListItem>
          <TopBar />
        </ListItem>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack>
              <ListItem
                style={
                  {
                    // marginLeft: "22px",
                  }
                }
              >
                {width > 520 && <BreadCrumb />}
                {/* <BreadCrumb /> */}
              </ListItem>
              <ListItem
                style={{
                  paddingTop: "20px",
                  // marginLeft: "42px",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                Select Payment Mode
              </ListItem>
              <ListItem
                style={{
                  paddingTop: "20px",
                  // marginLeft: "42px",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                {/* <CartCard /> */}
                <ButtonWithCheckBox onSelect={checkedValueHandler} />
              </ListItem>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              paddingTop: "50px",
              // paddingRight: "30px",
            }}
          >
            <OrderDetailsWithPay
              pay={true}
              checked={checked}
              cartTotal={cartTotal}
              orderId={orderId}
              user={user}
              deliveryCharge={deliveryCharge}
              amountToPay={isFullAmountPaid}
            />
          </Grid>
        </Grid>
      </div>
    </>
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
  let orderId, cartTotal, deliveryCharge, isFullAmountPaid;
  try {
    const retailerOrders = await orderModel.find({ retailerId: retailerId });
    cartTotal = retailerOrders[retailerOrders.length - 1].totalAmount;
    orderId = retailerOrders[retailerOrders.length - 1]._id.toString();
    deliveryCharge = retailerOrders[retailerOrders.length - 1].deliveryCharge;
    isFullAmountPaid =
      retailerOrders[retailerOrders.length - 1].isFullAmountPaid;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
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
