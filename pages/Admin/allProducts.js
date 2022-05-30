import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import LogoSVG from "../../Resources/logo.svg";
import NewSearchBar from "../../component/newSearchBar";
import TableR from "../../component/Table8";
import dbConnect from "../../utils/dbConnect";
import Products from "../../models/productModel";
import Orders from "../../models/orderModel";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "../../lib/get-session";

export default function AdminPanel2({ products }) {
  function createTempHeading(product) {
    return {
      productId: product._id,
      name: product.productName,
      qtyAvailable: product.qtyAvailable,
      price: product.price,
      tax: product.tax,
    };
  }
  const router = useRouter();
  const addProductHandler = () => {
    router.push("/Admin/modifyProduct/add");
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteHandler = async (productId) => {
    const rem = await axios.delete(`/api/admin/products/${productId}`);
    refreshData();
  };
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
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container>
        <Grid
          item
          xs={6}
          md={3}
          style={{
            textAlign: "center",
            backgroundColor: "",
            marginTop: "30px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#31BA2E",
              color: "white",
              fontWeight: 700,
              padding: "10px 40px",
            }}
            onClick={() => addProductHandler()}
          >
            Add Product
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          style={{
            textAlign: "center",
          }}
        >
          <NewSearchBar allCategories={false} />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{
            textAlign: "center",
            // backgroundColor: "yellow",
            paddingTop: "30px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#31BA2E",
              color: "white",
              fontWeight: 700,
              padding: "0 40px",
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Search Category
          </Button>
        </Grid>
      </Grid>
      <TableR
        refreshData={refreshData}
        functionHeading={createTempHeading}
        data={products}
        deleteHandler={deleteHandler}
      />
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
  let products;
  try {
    products = await Products.find({});
  } catch (error) {}
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}