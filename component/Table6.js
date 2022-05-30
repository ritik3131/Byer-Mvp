import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DenseTable({ data }) {
  return (
    <div style={{ margin: "0 50px" }}>
      <TableContainer component={Paper} style={{ padding: "0 104x" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> Today </TableCell>
              <TableCell>Weekly</TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data.today.toFixed(2)}</TableCell>
              <TableCell>{data.weekly.toFixed(2)}</TableCell>
              <TableCell>{data.monthly.toFixed(2)}</TableCell>
              <TableCell>{data.total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
