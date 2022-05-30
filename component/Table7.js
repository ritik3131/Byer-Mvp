import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DenseTable(props) {
  const rows =
    props.data.length > 0
      ? props.data.map((SingleData) => {
          return props.functionHeading(SingleData);
        })
      : [];

  const paymentStatusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    await axios.patch("/api/order/newOrder", {
      paymentStatus: newStatus,
      orderId,
    });
  };
  const deliveryStatusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    await axios.patch("/api/order/newOrder", {
      deliveryStatus: newStatus,
      orderId,
    });
  };
  const orderStatusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    await axios.patch("/api/order/newOrder", {
      orderRejected: newStatus !== "Accepted",
      orderId,
    });
  };
  return (
    <div style={{ margin: "0 50px" }}>
      <TableContainer component={Paper} style={{ padding: "0 104x" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Retailer Name</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Order Value</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Delivery Value</TableCell>
              <TableCell>Payment Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.orderId}
                  </TableCell>
                  <TableCell>{row.products}</TableCell>
                  <TableCell>{row.retailerName}</TableCell>
                  <TableCell>{row.StoreName}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.orderValue.toFixed(2)}</TableCell>
                  <TableCell>
                    <select
                      onChange={(e) => orderStatusHandler(e, row.orderId)}
                    >
                      {row.orderStatus === "Rejected" ? (
                        <option value="Rejected" selected>
                          Rejected
                        </option>
                      ) : (
                        <option value="Rejected">Rejected</option>
                      )}
                      {row.orderStatus === "Accepted" ? (
                        <option value="Accepted" selected>
                          Accepted
                        </option>
                      ) : (
                        <option value="Accepted">Accepted</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      onChange={(e) => deliveryStatusHandler(e, row.orderId)}
                    >
                      {row.deliveryStatus === "Pending" ? (
                        <option value="Pending" selected>
                          Pending
                        </option>
                      ) : (
                        <option value="Pending">Pending</option>
                      )}
                      {row.deliveryStatus === "LocalTouchPoint" ? (
                        <option value="LocalTouchPoint" selected>
                          LocalTouchPoint
                        </option>
                      ) : (
                        <option value="LocalTouchPoint">LocalTouchPoint</option>
                      )}
                      {row.deliveryStatus === "Delivered" ? (
                        <option value="Delivered" selected>
                          Delivered
                        </option>
                      ) : (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      onChange={(e) => paymentStatusHandler(e, row.orderId)}
                    >
                      {row.paymentStatus === "Completed" ? (
                        <option value="Completed" selected>
                          Completed
                        </option>
                      ) : (
                        <option value="Completed">Completed</option>
                      )}
                      {row.paymentStatus === "10%" ? (
                        <option value="10%" selected>
                          10% Paid
                        </option>
                      ) : (
                        <option value="10%">10% Paid</option>
                      )}
                      {row.paymentStatus === "0%" ? (
                        <option value="0%" selected>
                          0% Paid
                        </option>
                      ) : (
                        <option value="0%">0% Paid</option>
                      )}
                    </select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
