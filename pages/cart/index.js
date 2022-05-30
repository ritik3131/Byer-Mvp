import TopBar from "../../component/topBar";
import { Link, Stack } from "@mui/material";
import { ListItem } from "@mui/material";
import BreadCrumb from "../../component/BreadCrumb";
import CartCard from "../../component/CartCard";
import Head from "next/head";
import { Grid } from "@mui/material";
import OrderDetailsWithPay from "../../component/OrderDetailsWithPayment";
import dbConnect from "../../utils/dbConnect";
import Cart from "../../models/cartModel";
import retailerModel from "../../models/retailerModel";
import Product from "../../models/productModel";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "../../lib/get-session";
import UnauthRedirect from "../../component/UnauthRedirect";
import * as React from "react";
import { calculatePriceForDelivery } from "../../utils/calcutatePriceForDelivery";
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

function Home({ productsData, cartId, user }) {
  const [cartTotal, setCartTotal] = useState(0);
  const size = useWindowSize();
  const [tax, setTax] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    const updateTotal = () => {
      let total = Number(0);
      let tx = Number(0);
      productsData &&
        productsData.forEach((pro) => {
          total = total + pro.price * pro.qty;
          const actualPrice =
            pro.price / (1 + pro.tax / 100 + pro.commission / 100);
          tx = tx + actualPrice * (pro.tax / 100) * pro.qty;
        });
      setCartTotal(total);
      setTax(tx);
    };
    const isSelfPickup = localStorage.getItem("deliveryOption") === "self";
    const lon1 = process.env.NEXT_PUBLIC_TOUCH_POINT_LONG;
    const lat1 = process.env.NEXT_PUBLIC_TOUCH_POINT_LAT;
    const lon2 = user.location.coordinates.lng;
    const lat2 = user.location.coordinates.lat;
    const deliveryCharge = calculatePriceForDelivery(lon1, lat1, lon2, lat2);
    setDeliveryCharges(isSelfPickup ? 0 : deliveryCharge);
    console.log(deliveryCharge);
    updateTotal();
  }, [productsData]);

  if (!user) return <UnauthRedirect />;

  const updateCart = async (productId, qty) => {
    const up = await axios.put("/api/cart/addToCart", { productId, qty });
    refreshData();
  };

  const removeItem = async (productId) => {
    const rem = await axios.delete(`/api/cart/${cartId}/${productId}`);
    refreshData();
  };

  const proceedToOrderHandler = () => {};
  const width = size.width;
  return (
    <div>
      <Head>
        <title>Byer | Your Cart</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <ListItem style={{ zIndex: 12, marginBottom: "40px" }}>
        <TopBar />
      </ListItem>

      {productsData ? (
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            style={
              {
                // paddingTop: "50px",
                // paddingRight: "30px",
              }
            }
          >
            {/* <Stack> */}
            <ListItem
              style={{
                marginLeft: "22px",
                marginRight: "20px",
              }}
            >
              {width > 520 && <BreadCrumb />}
            </ListItem>
            <ListItem
              style={{
                paddingTop: "20px",
                // marginLeft: "42px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              My Cart
            </ListItem>
            {productsData.map((prod) => {
              return (
                <ListItem
                  key={prod.id}
                  style={{
                    paddingTop: "20px",
                    margin: "0 auto",
                    fontSize: "30px",
                    fontWeight: "700",
                  }}
                >
                  <CartCard
                    product={prod}
                    removeItem={removeItem}
                    updateCart={updateCart}
                    heading={false}
                  />
                </ListItem>
              );
            })}
            {/* </Stack> */}
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
            <ListItem
              style={{
                paddingTop: "20px",
                margin: "0 auto",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              <OrderDetailsWithPay
                proceedToOrderHandler={proceedToOrderHandler}
                cartTotal={cartTotal}
                cartPage={true}
                checkbox={true}
                tax={tax}
                deliveryCharge={deliveryCharges}
              />
            </ListItem>
          </Grid>
        </Grid>
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  let productsData;
  let cartId;
  const { user } = await getSession(req, res);
  if (user === undefined || !user)
    return {
      redirect: {
        destination: `/home`,
      },
    };
  let retailerId = user._id;
  try {
    const retailer = await retailerModel.findById(retailerId);
    cartId = retailer.cart;
    const cart = await Cart.findById(cartId);
    const products = cart.products;
    productsData = await Promise.all(
      products.map(async (pro) => {
        async function fun(pro) {
          const product = await Product.findOne({ _id: pro.productId });
          return product;
        }
        let product = await fun(pro);
        return {
          id: product._id.toString(),
          name: product.productName,
          price: product.price,
          imageId: product.image,
          qty: pro.qty,
          commission: product.commission,
          tax: product.tax,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      productsData: JSON.parse(
        JSON.stringify(productsData ? productsData : null)
      ),
      cartId: JSON.parse(JSON.stringify(cartId)),
      user: user,
    },
  };
}

export default Home;
