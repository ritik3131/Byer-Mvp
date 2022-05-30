import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const redirectFunction = (orderID) => {
    if(props.retailerOrderDetail)
    router.push(`/Order-Views/${orderID}`);
   else
    router.push(`/Admin/products/${orderID}`);
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <TableContainer component={Paper} style={{ padding: "0 104x" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>OrderID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Order Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.orderID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button onClick={() => redirectFunction(row.orderID)}>
                      {row.orderID}
                    </Button>
                  </TableCell>
                  <TableCell>{row.Date.split("T")[0]}</TableCell>
                  <TableCell>{row.TotalOrderValue.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
