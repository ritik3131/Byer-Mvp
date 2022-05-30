import { Rating } from "@material-ui/core";
import { Button, CardContent, ListItem, Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import threeVertical from "../Resources/3Vertical.svg";
import SugarBag from "../Resources/Sugar Bag.jpeg";
function CartCard({qty,price,productName}) {
  return (
    <>
      <Card
        style={{
          borderColor: "grey",
          borderWidth: "2px",
          boxShadow: 0,
          //   padding: "12px",
        }}
        sx={{ width: 1, border: 1 }}
      >
        <ListItem>
          <img
            src={SugarBag.src}
            alt="ok"
            style={{ height: "90px", width: "90px" }}
          />
          <ListItem
            style={{ fontWeight: 700, fontSize: "20px" }}
            secondaryAction={
              <Stack direction="horizontal">
                <Stack spacing={`-10px`}>
                  <ListItem>Qty.</ListItem> <ListItem>{qty}</ListItem>
                </Stack>
                <Stack spacing={`-10px`}>
                  <ListItem>Price</ListItem> <ListItem>{price}</ListItem>
                </Stack>
              </Stack>
            }
          >
            {productName}
          </ListItem>
        </ListItem>
        <CardContent
          style={{
            backgroundColor: "#e3e5e5",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          Add Rating{" "}
          <Rating name="no-value" style={{top:"8px"}} value={null} />
        </CardContent>
      </Card>
    </>
  );
}
export default CartCard;
