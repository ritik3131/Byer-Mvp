
import { Button, Stack } from "@mui/material";
import RiceBag from "../Resources/Sugar Bag.jpeg";
import { Card } from "@mui/material";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
function CartCard() {
  return (
    <Card>
      <Stack direction="row">
        <img src={RiceBag.src} alt="ok" />
        <Stack style={{ padding: "12px" }}>
          <div style={{ marginTop: "80px" }}>M30 Sugar</div>
          <Button
            variant="outlined"
            style={{
              width: "80%",
              margin: "0 auto",
              color: "black",
              fontWeight: "700",
              borderColor: "#c4c4c4",
            }}
          >
            Remove
          </Button>
        </Stack>
        <Stack
          style={{
            marginTop: "70px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              margin: "0 auto",
            }}
          >
            Quantity
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <div
              style={{
                display: "inline-block",

                marginRight: "12px",
              }}
            >
              <IconButton color="secondary" aria-label="add an alarm">
                <RemoveIcon />
              </IconButton>
            </div>
            <TextField
              id="outlined-read-only-input"
              // label="Read Only"
              defaultValue="50"
              style={{
                width: "50%",
                margin: "0 auto",
              }}
              InputProps={{
                readOnly: true,
              }}
            />
            <div style={{ display: "inline-block", marginLeft: "12px" }}>
              <IconButton color="secondary" aria-label="add an alarm">
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </Stack>
      </Stack>
      <div style={{width:"100%" , backgroundColor:"#c4c4c4" , textAlign:"right" , paddingRight:"90px"}}>Total : 2000 Rs</div>
    </Card>
  );
}
export default CartCard;
