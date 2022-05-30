import { Button, ListItem, Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import threeVertical from "../Resources/3Vertical.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import { Document, Page } from "react-pdf";
import axios from "axios";
import { saveAs } from "file-saver";
import * as path from "path";
import { useState } from "react";
import dynamic from "next/dynamic";

const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});
function CartCard(props) {
  const [filepath, setFilePath] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  async function getTicketsPdf() {
    return axios.get(`/api/downloadInvoice/${props.orderId}`, {
      headers: {
        Accept: "application/pdf",
      },
      responseType: "arraybuffer",
    });
  }
  const downloadInvoiceHandler = async () => {
    //Here modification needed
    const body = {
      orderId: props.orderId,
    };
    await axios.post("/api/downloadInvoice/getInvoice", body);
    const filename = "invoice-" + props.orderId + ".pdf";
    const filepath = path.resolve("documents/invoices", filename);
    setFilePath(filepath);
    setShowPdf(true);
    props.onRouter(filepath);
    // const { data } = new getTicketsPdf();
    // const blob = new Blob([data], { type: "application/pdf" });
    // saveAs(blob, "invoice.pdf");
  };
  return (
    <>
      <Card
        style={{
          //   height: "400px",
          // height: "fit-content",
          borderColor: "grey",
          borderWidth: "2px",
          borderBottom: 1,
          boxShadow: 0,
          backgroundColor: "#e3e5e5",
        }}
        sx={{ width: 1 }}
        // variant="outlined"
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
        {props.heading === undefined ? null : (
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
            {props.heading}
          </div>
        )}
        <ListItem
          style={{ paddingLeft: "16px", fontSize: "17px" }}
          secondaryAction={
            <Button
              variant="outlined"
              style={{ color: "black", borderColor: "grey" }}
              onClick={downloadInvoiceHandler}
            >
              Download Invoice
            </Button>
          }
        >
          {" "}
          Order Placed : {props.time}
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            marginRight: "302px",
          }}
          secondaryAction={<div>{props.amount}</div>}
        >
          Total Amount:
        </ListItem>
        <ListItem
          style={{
            fontSize: "18px",
            // backgroundColor: "#c4c4c4",

            color: "#31BA2E",
          }}
        >
          {props.heading === undefined ? `Change Address` : null}
        </ListItem>
        <ListItem style={{ marginBottom: "20px" }}>
          <Card style={{ backgroundColor: "white" }} sx={{ width: 1 }}>
            <ListItem
              style={{ fontSize: "15px" }}
              //   secondaryAction={<div>ok</div>}
            >
              Payment Status
            </ListItem>
            <ListItem
              style={{ fontSize: "18px", fontWeight: 700 }}
              secondaryAction={
                <div>
                  <KeyboardArrowDownIcon />
                </div>
              }
            >
              {props.status}
            </ListItem>
          </Card>
        </ListItem>
        {/* </Stack> */}
        {props.button === undefined ? (
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
