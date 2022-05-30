import { Card, Grid } from "@mui/material";

function LastBar() {
  return (
    <Card>
      <Grid container spacing={`90px`} style={{ textAlign: "center" }}>
        {[
          "All",
          "Pending",
          "Rescedhuled",
          "Packed",
          "Shipped",
          "Hold",
          "Courier Returned",
          "Delievered",
          "Cancelled",
          "Expired",
          "Processing",
        ].map((elem) => {
          return (
            <>
              <Grid item xs={1} style={{ textAlign: "center" , fontWeight:"600" , color:"#31BA2E" }}>
                {elem}
              </Grid>
            </>
          );
        })}
      </Grid>
    </Card>
  );
}
export default LastBar;
