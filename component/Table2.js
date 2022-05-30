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

  const router = useRouter();
  const redirectFunction = (userID) => {
    router.push(`/Admin/orders/${userID}`);
  };

  const creditStatusHandler = async (e, userId) => {
    await axios.patch("/api/admin/editRetailer", {
      userId,
      creditStatus: e.target.value === "Applied" ? true : false,
    });
  };
  const kycStatusHandler = async (e, userId) => {
    await axios.patch("/api/admin/editRetailer", {
      userId,
      kycVerificationStatus: e.target.value === "Verified" ? true : false,
    });
  };

  const viewDocsHandler = (userId) => {
    router.push(`/Admin/viewDocs/${userId}`);
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <TableContainer component={Paper} style={{ padding: "0 104x" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Retailer Name</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Credit Status</TableCell>
              <TableCell>KYC Verification Status</TableCell>
              <TableCell>View Docs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.userID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#31BA2E",
                        color: "white",
                        fontWeight: 700,
                        padding: "0 40px",
                      }}
                      onClick={() => redirectFunction(row.userID)}
                    >
                      {row.userID}
                    </Button>
                  </TableCell>
                  <TableCell>{row.MobileNumber}</TableCell>
                  <TableCell>{row.RetailerName}</TableCell>
                  <TableCell>{row.StoreName}</TableCell>
                  <TableCell>
                    <select
                      onChange={(e) => creditStatusHandler(e, row.userID)}
                    >
                      {row.CreditStatus === "Applied" ? (
                        <option value="Applied" selected>
                          Applied
                        </option>
                      ) : (
                        <option value="Applied">Applied</option>
                      )}
                      {row.CreditStatus === "Not applied" ? (
                        <option value="Not applied" selected>
                          Not applied
                        </option>
                      ) : (
                        <option value="Not applied">Not applied</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell>
                    <select onChange={(e) => kycStatusHandler(e, row.userID)}>
                      {row.KYCVerificationStatus === "Verified" ? (
                        <option value="Verified" selected>
                          Verified
                        </option>
                      ) : (
                        <option value="Verified">Verified</option>
                      )}
                      {row.KYCVerificationStatus === "Not verified" ? (
                        <option value="Not verified" selected>
                          Not verified
                        </option>
                      ) : (
                        <option value="Not verified">Not verified</option>
                      )}
                    </select>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#31BA2E",
                        color: "white",
                        fontWeight: 700,
                        padding: "0 40px",
                        right: "130px",
                      }}
                      onClick={() => viewDocsHandler(row.userID)}
                    >
                      {row.ViewDocs}
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
