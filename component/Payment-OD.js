import { Button, ListItem, Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import threeVertical from "../Resources/3Vertical.svg";
function CartCard({ totalPay, due, heading, button }) {
  const amountPaid = totalPay - due;
  return (
    <>
      <Card
        sx={{
          //   height: "400px",
          // height: "fit-content",
          borderColor: "grey",
          borderWidth: "2px",
          borderBottom: 1,
          boxShadow: 0,
          width: 1,
        }}
        variant="outlined"
        elevation={0}
      >
        {/* <Stack> */}
        {/* <Card style={{ color: "grey" }}> */}
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
          style={{ paddingLeft: "16px", fontSize: "18px", fontWeight: 700 }}
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
          Amount Paid :{amountPaid}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            marginRight: "302px",
            fontWeight: 700,
          }}
        >
          Total Due :{due}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            // backgroundColor: "#c4c4c4",

            color: "#31BA2E",
          }}
        >
          {heading === undefined ? `Change Address` : null}
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
                // marginRight:" auto"
                // width:"70vw"
              }}
            >
              <Typography style={{ fontWeight: "600" }}>Proceed</Typography>
            </Button>
          </ListItem>
        ) : null}{" "}
        {/* </Stack> */}
        {/* </Card> */}
      </Card>
    </>
  );
}
export default CartCard;
