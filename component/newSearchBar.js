import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function CustomizedInputBase(props) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: `${props.width === undefined ? "700px" : "90vw"}`,
        margin: "20px auto",
      }}
    >
      {props.allCategories!==false && (
        <IconButton
          sx={{
            p: "10px",
            fontSize: "16px",
            fontStyle: "Roboto",
            color: "black",
          }}
          aria-label="menu"
        >
          All Categories <KeyboardArrowDownIcon />
        </IconButton>
      )}{" "}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search... " }}
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
          backgroundColor: "#31BA2E",
          borderRadius: "12px",
          marginRight: "-1px ",
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions"> */}
      {/* <DirectionsIcon /> */}
      {/* </IconButton> */}
    </Paper>
  );
}
