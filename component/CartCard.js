import { Button, Stack, Typography } from "@mui/material";
import RiceBag from "../Resources/Sugar Bag.jpeg";
import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useState } from "react";
function CartCard({ product, updateCart, removeItem }) {
  const [quantity, setQuantity] = useState(product.qty);

  const qtyChangeHandler = async (val) => {
    updateCart(product.id, val);
    setQuantity(val);
  };
  const incHandler = async () => {
    updateCart(product.id, quantity + 1);

    setQuantity((prev) => prev + 1);
  };
  const decHandler = async () => {
    updateCart(product.id, quantity - 1);

    setQuantity((prev) => prev - 1);
  };

  const removeItemHandler = () => {
    removeItem(product.id);
  };
  return (
    <Card sx={{ width: 1 }}>
      <Stack direction="row">
        <img
          src={`/api/getImage/${product.imageId}`}
          width="30%"
          alt={`sorry`}
        />
        <Stack style={{ padding: "12px" }}>
          <div style={{ marginTop: "80px" }}>{product.name}</div>
          <Button
            onClick={() => removeItemHandler()}
            variant="outlined"
            style={{
              width: "80%",
              margin: "0 auto",
              color: "black",
              fontWeight: "700",
              borderColor: "#c4c4c4",
              marginLeft: "-1px",
            }}
          >
            Remove
          </Button>
        </Stack>
        <Stack
          style={{
            marginTop: "70px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              margin: "0 auto",
            }}
          >
            Quantity
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <div
              style={{
                display: "inline-block",

                marginRight: "12px",
              }}
            >
              <IconButton
                onClick={() => {
                  decHandler();
                }}
                color="secondary"
                aria-label="add an alarm"
              >
                <RemoveIcon />
              </IconButton>
            </div>
            <TextField
              id="outlined-read-only-input"
              // label="Read Only"
              style={{
                width: "50%",
                margin: "0 auto",
              }}
              value={quantity}
              onChange={(e) => qtyChangeHandler(Number(e.currentTarget.value))}
            />
            <div
              // onClick={() => decHandler()}
              style={{ display: "inline-block", marginLeft: "12px" }}
            >
              <IconButton
                onClick={() => {
                  incHandler();
                }}
                color="secondary"
                aria-label="add an alarm"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </Stack>
      </Stack>
      <div
        style={{
          width: "100%",
          backgroundColor: "#c4c4c4",
          textAlign: "right",
          paddingRight: "90px",
        }}
      >
        Total : {(Number(quantity) * Number(product.price)).toFixed(2)} Rs
      </div>
    </Card>
  );
}
export default CartCard;
