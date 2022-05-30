import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LogoSVG from "../../../Resources/logo.svg";
import TableR from "../../../component/Table5";
import dbConnect from "../../../utils/dbConnect";
import Retailers from "../../../models/retailerModel";
import Orders from "../../../models/orderModel";
import Products from "../../../models/productModel";
import { getSession } from "../../../lib/get-session";

function AdminPanel4({ products }) {
  function createTempHeading(product) {
    return {
      id: product.id,
      name: product.name,
      qty: product.qty,
      price: product.price,
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
                Products
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TableR functionHeading={createTempHeading} data={products} />
    </>
  );
}

export default AdminPanel4;

export async function getServerSideProps(context) {
  await dbConnect();
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  const { orderId } = context.query;

  let products;
  let order;
  let productsData = [];
  try {
    order = await Orders.findById(orderId);
    products = order.products;
    productsData = await Promise.all(
      products.map(async (pro) => {
        async function fun(pro) {
          const product = await Products.findOne({ _id: pro.productId });
          return product;
        }
        let product = await fun(pro);
        return {
          id: product._id.toString(),
          name: product.productName,
          price: product.price,
          qty: pro.qty,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(productsData ? productsData : [])),
    },
  };
}
