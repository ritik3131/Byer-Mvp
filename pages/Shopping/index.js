import { Grid } from "@mui/material";
import Appbar from "../../component/AppBar";
import MiddleComponent from "../../component/MiddleComponent";
import SingleCard from "../../component/SingleItemCard";
import dbConnect from "../../utils/dbConnect";
import Products from "../../models/productModel";
import { getSession } from "../../lib/get-session";
import cartModel from "../../models/cartModel";
import UnauthRedirect from "../../component/UnauthRedirect";
import { useRouter } from "next/router";
import Head from "next/head";

function ShoppingPlace({ products, user, cartCount, deliveryOptions }) {
  const router = useRouter();
  if (!user) return <UnauthRedirect />;

  const routerToStoreKycHandler = () => {
    router.push("/Store-Verification");
  };

  const routerToAdminHandler = () => {
    router.push("/Admin/AdminPanel1");
  };


  const routerToCartHandler = () => {
    router.push("/cart");
  };

  const routerToProfile = async () => {
    router.push(`/retailerProfile/${user._id}`);
  };

  return (
    <>
      <Head>
        <title>Byer | Shopping</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <Appbar
        routerToProfile={routerToProfile}
        cartCount={cartCount}
        routerToStoreKyc={routerToStoreKycHandler}
        routerToAdmin={routerToAdminHandler}
        isAdmin={user.isAdmin}
      />
      <MiddleComponent deliveryOptions={0} />
      <Grid
        container
        justifyContent={`center`}
        sx={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          justifyItem: "center",
        }}
      >
        {products.map((product) => {
          return (
            <Grid item md={3} key={product._id}>
              <SingleCard
                key={product._id}
                product={product}
                onRouterToCart={routerToCartHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  dbConnect();
  const { user } = await getSession(req, res);
  if (user === undefined || !user)
    return {
      redirect: {
        destination: `/phone-auth`,
      },
    };

  const cartId = user.cart;
  const product = await cartModel.findById(cartId).products;
  const cartCount = product ? product.length : 0;
  const products = await Products.find({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      user,
      cartCount: JSON.parse(JSON.stringify(cartCount)),
    },
  };
}

export default ShoppingPlace;
