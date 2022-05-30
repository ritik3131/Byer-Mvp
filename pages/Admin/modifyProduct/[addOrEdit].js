import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { withStyles } from "@mui/styles";
import LogoSVG from "../../../Resources/logo.svg";
import { getSession } from "../../../lib/get-session";
import dbConnect from "../../../utils/dbConnect";
import { useState } from "react";
import Products from "../../../models/productModel";
import axios from "axios";
import { useRouter } from "next/router";

function AdminPanel4({ purpose, productData }) {
  const router = useRouter();
  const [name, setName] = useState(
    purpose === "add" ? "" : productData.productName
  );
  const [priceReal, setPriceReal] = useState(
    purpose === "add"
      ? 0
      : productData.price /
          (1 + productData.tax / 100 + productData.commission / 100)
  );
  const [qty, setQty] = useState(purpose === "add" ? 0 : productData.quantity);
  const [category, setCategory] = useState(
    purpose === "add" ? "" : productData.category
  );
  const [tax, setTax] = useState(purpose === "add" ? 0 : productData.tax);
  const [commsn, setCommsn] = useState(
    purpose === "add" ? 0 : productData.commission
  );
  const [available, setAvailable] = useState(
    purpose === "add" ? 0 : productData.qtyAvailable
  );
  const [file, setFile] = useState(
    purpose === "add" ? null : productData.image
  );

  const submitHandler = async () => {
    const newBody = {
      productName: name,
      price: priceReal * (1 + tax / 100 + commsn / 100),
      quantity: qty,
      category,
      tax,
      commission: commsn,
      qtyAvailable: available,
      image: file,
    };
    if (purpose === "add") {
      await axios.post("/api/admin/products", newBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.put(
        "/api/admin/products",
        { ...newBody, _id: productData._id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
    router.push("/Admin/allProducts");
  };
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#31BA2E",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#31BA2E",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#31BA2E",
        },
        "&:hover fieldset": {
          borderColor: "#31BA2E",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#31BA2E",
        },
      },
    },
  })(TextField);
  {
    /* <CssTextField
                  id="input-with-sx"
                  label="Product Name"
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                /> */
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
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ margin: "0 150px" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          alignContent={`center`}
        >
          <Grid item xs={3}>
            <Grid container spacing={`40px`}>
              <Grid item xs={12}>
                <CssTextField
                  id="input-with-sx"
                  label="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="input-with-sx"
                  label="Price"
                  value={priceReal}
                  onChange={(e) => setPriceReal(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="input-with-sx"
                  label="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  id="input-with-sx"
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="input-with-sx"
                  label="Tax"
                  onChange={(e) => setTax(e.target.value)}
                  value={tax}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="input-with-sx"
                  label="Commision"
                  value={commsn}
                  onChange={(e) => setCommsn(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  id="input-with-sx"
                  label="Quantity/Available"
                  value={available}
                  onChange={(e) => setAvailable(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: "black", fontWeight: "800" },
                  }}
                  inputProps={{ style: { color: "#31BA2E" } }}
                  fullWidth
                  style={{ boxShadow: "0px 4px 8px -4px black" }}
                />
              </Grid>
              {purpose === "add" && (
                <Grid item xs={6}>
                  Product Image
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  ></input>
                </Grid>
              )}
              <Grid item xs={6}></Grid>
            </Grid>
            <Button onClick={() => submitHandler()}>
              {purpose === "add" ? "Add" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default AdminPanel4;

export async function getStaticProps(context) {
  await dbConnect();
  const purpose = context.query.addOrEdit.substring(0, 3);
  const productId =
    purpose === "edi" ? context.query.addOrEdit.substring(4) : "";
  let productData = {};
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user || !user.isAdmin) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  if (purpose === "edi") {
    try {
      productData = await Products.findById(productId);
    } catch (err) {
      console.log(err);
    }
  }
  return {
    props: { purpose, productData: JSON.parse(JSON.stringify(productData)) },
  };
}
