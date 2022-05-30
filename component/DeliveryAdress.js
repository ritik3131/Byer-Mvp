import { Button, ListItem, Stack } from "@mui/material";
import { Card, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import threeVertical from "../Resources/3Vertical.svg";
function CartCard({
  deliveryAddress,
  orderId,
  name,
  number,
  heading,
  button,
  changeAddress,
}) {
  const [address, setAddress] = useState(true);
  const [newDeliveryAddress, setNewDeliveryAddress] = useState(deliveryAddress);
  const changeAddressHandler = async () => {
    const body = {
      newDeliveryAddress,
      orderId,
    };
    console.log("Change Address");
    if (deliveryAddress != newDeliveryAddress)
      await axios.put("/api/delivery/changeAddress", body);
  };
  return (
    <>
      <Card
        sx={{
          // height: "400px",
          // height: "fit-content",
          borderColor: "grey",
          borderWidth: "2px",
          // borderBottom: 1,
          // boxShadow: 0,
          width: 1,
        }}
        // fullWidth={true}
      >
        {/* <img src={RiceBag.src} alt="ok" /> */}
        {/* <Stack
          style={
            {
              //   marginLeft: "22px",
            }
          }
        > */}
        {heading === undefined ? null : (
          <div
            style={{
              paddingLeft: "16px",
              paddingBottom: "20px",
              fontSize: "30px",
              fontWeight: "700",
              color: "black",
            }}
          >
            {" "}
            {heading}
          </div>
        )}
        <ListItem
          style={{ paddingLeft: "16px" }}
          secondaryAction={
            heading === undefined ? (
              <div
                style={{
                  fontSize: "18px",
                  color: "#31BA2E",
                }}
              >
                <img src={threeVertical.src} alt="o" />
              </div>
            ) : null
          }
        >
          {" "}
          {name}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            marginRight: "302px",
          }}
        >
          {number}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
          }}
        >
          <TextField
            id="filled-read-only-input"
            label="Address"
            value={newDeliveryAddress}
            onChange={(e) => setNewDeliveryAddress(e.target.value)}
            disabled={!changeAddress}
            // InputProps={{
            //   readOnly: address,
            // }}
            variant="filled"
          />
          {/* {newDeliveryAddress} */}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            color: "#31BA2E",
          }}
          onClick={changeAddressHandler}
          // onClick={e=>setAddress(true)}
        >
          {changeAddress === true ? `Change Address` : null}
        </ListItem>
        {/* </Stack> */}
        {button === undefined ? (
          <ListItem style={{ paddingBottom: "200px" }}>
            <Button
              variant="filled"
              fullWidth
              style={{
                marginTop: "20px",
                backgroundColor: "#31BA2E",
                color: "white",
                marginBottom: "350px",
              }}
              onClick={changeAddressHandler}
            >
              <Typography style={{ fontWeight: "600" }}>Proceed</Typography>
            </Button>
          </ListItem>
        ) : null}{" "}
      </Card>
    </>
  );
}
export default CartCard;
