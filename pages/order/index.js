import TopBar from "../../component/topBar";
import { Grid, Stack } from "@mui/material";
import { ListItem } from "@mui/material";
import Searchbar from "../../component/SearchBar";
import LastBar from "../../component/lastBar";
import { getSession } from "../../lib/get-session";
import UnauthRedirect from "../../component/UnauthRedirect";
import dbConnect from "../../utils/dbConnect";
import orderModel from "../../models/orderModel";
import Head from "next/head";
function Home({ orders, user }) {
  if (!user) return <UnauthRedirect />;
  return (
    <>
     <Head>
        <title>Byer | Your Orders</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
    <Stack>
      <ListItem>
        <TopBar />
      </ListItem>
      <ListItem>
        <Searchbar />
      </ListItem>
      <ListItem style={{ paddingTop: "20px" }}>
        <Grid
          container
          spacing={12}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={1}>
            <LastBar />
          </Grid>
        </Grid>
      </ListItem>
    </Stack>
    </>
  );
}
export default Home;

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
  let order;
  try {
    const orders = await orderModel.find({ retailerId: retailerId });
    order = orders;
  } catch (err) {
    console.log(err);
  }
  console.log(order);

  return {
    props: {
      orders: JSON.parse(JSON.stringify(order ? order : null)),
      user: user,
    },
  };
}
