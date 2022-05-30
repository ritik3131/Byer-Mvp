import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import IndianRupee from "../Resources/IndianRupee.svg";
import Location from "../Resources/Location.svg";
import Bag from "../Resources/Bag.svg";
import Separator from "../Resources/Separator.svg";
import { ListItem, Stack } from "@mui/material";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          <img
            src={Separator.src}
            style={{
              marginBottom: "32px",
              marginRight: "-40px",
              marginLeft: "-10px",
            }}
            alt="ok"
          />
        }
      >
        <ListItem>
          <Stack>
            <img src={Bag.src} alt="ok" style={{paddingRight:"10px"}} />
            <div style={{}}>Cart</div>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack>
            <img
              src={Location.src}
              alt="ok"
              height={Bag.height}
              width={Bag.width}
              style={{ margin: "0 auto" }}
            />
            <div style={{}}>Delivery Details</div>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack>
            <img
              src={IndianRupee.src}
              alt="ok"
              height={Bag.height}
              width={Bag.width}
              style={{ margin: "0 auto" }}
            />
            <div style={{}}>Payment Options</div>
          </Stack>
        </ListItem>
      </Breadcrumbs>
    </div>
  );
}
