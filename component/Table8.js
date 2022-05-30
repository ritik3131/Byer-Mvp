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
  const editHandler = (productId) => {
    router.push(`/Admin/modifyProduct/edit${productId}`);
  };

  const deleteHandler = async (productId) => {
    props.deleteHandler(productId);
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <TableContainer component={Paper} style={{ padding: "0 104x" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity Available</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.qtyAvailable}</TableCell>
                  <TableCell>{row.price.toFixed(2)}</TableCell>
                  <TableCell>{row.tax.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#31BA2E",
                        color: "white",
                        fontWeight: 700,
                        padding: "0 40px",
                        margin: "0 20px",
                      }}
                      onClick={() => editHandler(row.productId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#31BA2E",
                        color: "white",
                        fontWeight: 700,
                        padding: "0 40px",
                      }}
                      onClick={() => deleteHandler(row.productId)}
                    >
                      Delete
                    </Button>
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
