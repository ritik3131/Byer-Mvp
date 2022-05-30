import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SugarBag from "../Resources/Sugar Bag.jpeg";
import { Stack, Grid } from "@mui/material";
import axios from "axios";
import { Router } from "next/router";

export default function MediaCard({ product, onRouterToCart }) {
  const addTocartHandler = async () => {
    const body = {
      productId: product._id,
      qty: 1,
    };
    const response = await axios.put("/api/cart/addToCart", body);
    if (response.status === 200) onRouterToCart();
  };
  return (
    <Card
      // sx={{
      //   maxWidth: `227px`,
      //   marginRight: "12px",
      //   margin: "12px",
      // }}
      elevation={0}
    >
      <Grid
        container
        spacing={`100px`}
        direction="column"
        alignItems="center"
        justifyContent="center"
        //   style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} style={{ margin: "10px" }}>
          <img
            src={`/api/getImage/${product.image}`}
            style={{ display: "inline-block", marginBottom: "-12px" }}
            alt="Sorry image not available please refresh the page"
            width="100%"
            height="150"
          />
          <Stack>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  backgroundColor: "#f5f5f5",
                  fontSize: "16px",
                }}
              >
                {product.productName}
              </Typography>
              <Typography
                style={{
                  backgroundColor: "#f5f5f5",
                  fontSize: "21px",
                  fontWeight: 700,
                }}
              >
                Price : Rs {product.price.toFixed(2)}
              </Typography>
              <Typography
                style={{
                  backgroundColor: "#f5f5f5",
                  fontSize: "21px",
                  fontWeight: 700,
                }}
              >
                Quantity per pack: {product.quantity} Kg
              </Typography>
              <Typography
                style={{
                  backgroundColor: "#f5f5f5",
                  fontSize: "16px",
                  color: "#31BA2E",
                  fontWeight: 600,
                }}
              >
                BYER Comission {product.commission}%
              </Typography>
              {product.qtyAvailable === 0 && (
                <p style={{ color: "red" }}>Out Of Stock</p>
              )}
              {product.qtyAvailable !== 0 && (
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingBottom: "10px",
                    fontSize: "16px",
                    color: "#31BA2E",
                    fontWeight: 600,
                  }}
                >
                  <Button
                    variant="filled"
                    style={{
                      backgroundColor: "#31BA2E",
                      color: "white",
                      paddingRight: "20px",
                      paddingLeft: "20px",
                      fontWeight: 700,
                      borderRadius: "10px",
                    }}
                    onClick={addTocartHandler}
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
