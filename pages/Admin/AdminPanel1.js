import { Button, Card, CardContent, Grid, Stack } from "@mui/material";
import NewTopBar from "../../component/NotificationTopBar";
import RiceBag from "../../Resources/wheat.jpeg";
import Retailers from "../../models/retailerModel";
import Products from "../../models/productModel";
import Orders from "../../models/orderModel";
import dbConnect from "../../utils/dbConnect";
import { useRouter } from "next/router";
import { getSession } from "../../lib/get-session";

function AdminPanel1({
  retailerCount,
  grossRevenue,
  ordersCount,
  productsCount,
  revenue,
}) {
  const arr = [
    { name: "Gross Revenue", value: grossRevenue.toFixed(2), link: "" },
    { name: "Users", value: retailerCount, link: "/Admin/allRetailers" },
    { name: "Revenue", value: "visit Link", link: "/Admin/revenue" },
    { name: "Products", value: productsCount, link: "/Admin/allProducts" },
    { name: "Orders", value: ordersCount, link: "/Admin/allOrders" },
    { name: "BYERS MYTRA", value: "...", link: "" },
  ];
  const router = useRouter();
  const redirectFunction = (link) => {
    router.push(link);
  };
  return (
    <>
      <div style={{}}>
        <NewTopBar />
        <div style={{ textAlign: "right", padding: "20px 30px" }}>
          <img src={RiceBag.src} />
        </div>
      </div>
      <div style={{ padding: "1px 20px", margin: "0 auto" }}>
        <Grid
          container
          spacing={`50px`}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Grid container spacing={`30px`}>
              {arr.map((elem) => {
                return (
                  <Grid item sm={12} xs={12} md={6} lg={4} key={elem.name}>
                    <Button
                      style={{
                        backgroundColor: "#e3e5e5",
                        borderColor: "#31BA2E",
                      }}
                      variant="outlined"
                      onClick={() => redirectFunction(elem.link)}
                    >
                      <Stack spacing={`-10px`}>
                        <CardContent
                          style={{
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: "20px",
                            color: "#31BA2E",
                          }}
                        >
                          {elem.name}
                        </CardContent>
                        <CardContent
                          style={{
                            textAlign: "center",
                            borderColor: "#31BA2E",
                          }}
                        >
                          <div
                            // variant="outlined"
                            style={{
                              // backgroundColor: "white",
                              color: "black",
                              fontWeight: "700",
                              color: "#31BA2E",
                            }}
                          >
                            {elem.value}
                          </div>{" "}
                        </CardContent>
                      </Stack>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default AdminPanel1;

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
  let productsCount;
  let retailerCount;
  let ordersCount;
  let grossRevenue = 0;
  try {
    let users = await Retailers.find({});
    let retailers = users.filter((user) => !user.isAdmin);
    retailerCount = retailers.length;
    let orders = await Orders.find({});
    ordersCount = orders.length;
    let products = await Products.find({});
    productsCount = products.length;
    //finding gross revenue
    let successfulOrders = orders.filter((order) => {
      return order.orderRejected === false;
    });
    successfulOrders.forEach((ord) => {
      grossRevenue += Number(ord.totalAmount);
    });
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      retailerCount,
      ordersCount,
      productsCount,
      grossRevenue,
    },
  };
}

