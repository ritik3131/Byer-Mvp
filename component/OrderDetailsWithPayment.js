import {
  Button,
  CardActions,
  Checkbox,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CartCard({
  pay,
  tax,
  checked,
  deliveryCharge,
  cartTotal,
  proceedToOrderHandler,
  cartPage,
  deliveryPage,
  orderId,
  checkbox,
  amountToPay,
}) {
  const router = useRouter();
  const [isFullAmountPaid, setIsFullAmountPaid] = useState(1);
  useEffect(() => {
    localStorage.setItem("isFullAmountPaid", isFullAmountPaid);
  }, [isFullAmountPaid]);

  function isDate(val) {
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }
  const proceedHandler = async (e) => {
    if (pay) {
      let API_END_POINT;
      if (checked) API_END_POINT = "/api/payment/cash";
      else API_END_POINT = "/api/payment/paytmGateway";
      const body = {
        bookingPayment: false,
        amount: (amountToPay ? cartTotal : 0.1 * cartTotal + deliveryCharge)
          .toFixed(2)
          .toString(),
        orderId: orderId,
      };
      const response = await axios.post(API_END_POINT, body);
      if (!checked) {
        var information = {
          action:
            process.env.NEXT_PUBLIC_NODE_ENV === "production"
              ? "https://securegw.paytm.in/theia/processTransaction"
              : "https://securegw-stage.paytm.in/order/process",
          // "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
          // // let txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
          params: response.data,
        };
        post(information);
      }
    } else if (cartPage) {
      const body = {
        isPickup: localStorage.getItem("deliveryOptions") === "self",
        isFullAmountPaid: localStorage.getItem("isFullAmountPaid") === 1,
        totalAmount: cartTotal,
        tax: tax,
        deliveryCharge,
      };
      router.push("/Delivery-Details-2");
      await axios.post("/api/order/newOrder", body);
    } else if (deliveryPage) {
      router.push("/Payment-Options");
    }
  };

  return (
    <>
      <Card sx={{ width: 1, fontWeight: 700 }}>
        {/* <img src={RiceBag.src} alt="ok" /> */}
        {/* <Stack
          style={
            {
              //   marginLeft: "22px",
            }
          }
        > */}
        <div style={{ paddingLeft: "16px", fontSize: "30px" }}>
          Order Details
        </div>
        <ListItem
          style={{
            fontSize: "18px",
            marginRight: "302px",
          }}
          secondaryAction={
            <div
              sx={{
                marginLeft: "92px",
                fontSize: "18px",
              }}
            >
              {cartTotal.toFixed(2)}
            </div>
          }
        >
          Cart Total
        </ListItem>

        <ListItem
          style={{
            fontSize: "18px",
          }}
          secondaryAction={
            <div
              stlye={{
                fontSize: "18px",
              }}
            >
              {tax}
            </div>
          }
        >
          Tax
        </ListItem>

        <ListItem
          style={{
            fontSize: "18px",
          }}
          secondaryAction={
            <div
              style={{
                fontSize: "18px",
              }}
            >
              {deliveryCharge.toFixed(2)}
            </div>
          }
        >
          Delivery Charges
        </ListItem>
        <ListItem
          style={{
            fontSize: "28px",
            backgroundColor: "#c4c4c4",
          }}
          secondaryAction={
            <div
              style={{
                fontSize: "18px",
              }}
            >
              {(cartTotal + deliveryCharge).toFixed(2)}
            </div>
          }
        >
          Total Amount
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            // backgroundColor: "#c4c4c4",
          }}
          secondaryAction={
            <div
              style={{
                fontSize: "18px",
              }}
            >
              {(cartTotal + deliveryCharge).toFixed(2)}
            </div>
          }
        >
          Total Due
        </ListItem>

        {checkbox && (
          <>
            <ListItem
              style={{
                fontSize: "18px",
                // backgroundColor: "#c4c4c4",
              }}
              secondaryAction={
                <Checkbox
                  checked={!isFullAmountPaid}
                  onChange={(e) => setIsFullAmountPaid(0)}
                  color="success"
                />
              }
            >
              Pay Booking Amount (10% total)
            </ListItem>
            <ListItem
              style={{
                fontSize: "18px",
                // backgroundColor: "#c4c4c4",
              }}
              secondaryAction={
                <Checkbox
                  checked={isFullAmountPaid}
                  onChange={(e) => setIsFullAmountPaid(1)}
                  color="success"
                />
              }
            >
              Pay Total
            </ListItem>
          </>
        )}
        {/* </Stack> */}
        <CardActions>
          <Button
            variant="filled"
            fullWidth
            size="small"
            style={{
              marginTop: "20px",
              backgroundColor: "#31BA2E",
              color: "white",
              marginBottom: "35px",
            }}
            onClick={() => proceedHandler()}
          >
            <Typography
              // onClick={() => proceedHandler()}
              style={{ fontWeight: "600" }}
            >
              {deliveryPage ? "Proceed to Payment" : "Proceed"}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
export default CartCard;

// CartCard.defaultProps = {
//   deliveryCharge: 0.0,
// };
