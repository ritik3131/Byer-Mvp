import { Box } from "@mui/system";
import DownTriangle from "../Resources/downTriangle.svg";
import * as React from "react";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "grey",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

export function OptionalComponent() {
  const size = useWindowSize();
  const width = size.width;
  return (
    <>
      {width <= 1407 && (
        <Search style={{ backgroundColor: "#F3F3F3" }}>
          {width > 544 && (
            <SearchIconWrapper>
              <Typography
                style={{
                  fontWeight: "900",
                  color: "black",
                  paddingRight: "20px",
                }}
              >
                All Categories{" "}
              </Typography>
              <KeyboardArrowDownIcon
                style={{
                  marginTop: "0px",
                  marginLeft: "-16px",
                  color: "black",
                }}
              />
            </SearchIconWrapper>
          )}{" "}
          <StyledInputBase
            placeholder="Search for items..."
            inputProps={{ "aria-label": "search", color: "black" }}
            style={{ marginLeft: "150px" }}
          />
          {width >= 932 && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              style={{
                backgroundColor: "#31BA2E",
                marginRight: "-10px",
                zIndex: "1",
                borderRadius: "2px",
              }}
              sx={{ mr: 2 }}
            >
              {/* <img src={BYERSVG.src} height={`20px`} width={`20px`} alt="Sorry Image Not Available" /> */}
              {/* <div style={{ backgroundColor: "#31BA2E", marginRight: "-30px" }}> */}
              <SearchIcon />
              {/* </div> */}
            </IconButton>
          )}{" "}
        </Search>
      )}
    </>
  );
}
function MiddleComponent({ deliveryOptions }) {
  const [newDeliveryOption, setNewDeliveryOption] =
    React.useState(deliveryOptions);

  React.useEffect(() => {
    localStorage.setItem(
      "deliveryOption",
      newDeliveryOption === 0 ? "del" : "self"
    );
  }, [newDeliveryOption]);
  let arr = { del: 0, self: 1 };
  const changeDeliveryOptionsHandler = (e) => {
    setNewDeliveryOption(arr[e.target.value]);
    localStorage.setItem("deliveryOption", e.target.value);
  };
  const size = useWindowSize();
  const width = size.width;
  return (
    <>
      <Box
        style={{ marginTop: "20px", textAlign: "center", alignItems: "center" }}
      >
        <div
          style={{
            fontFamily: "Roboto",

            fontSize: "20px",
            color: "black",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          <b>To Order By call contact us </b> 7008342004
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginRight: "40px",
            marginTop: "-20px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              marginTop: "20px",
              // backgroundColor: "#31BA2E",
              borderColor: "#31BA2E",
              borderWidth: "2px",
              color: "white",
              marginBottom: "20px",
            }}
            endIcon={<img src={DownTriangle.src} alt="Sorry Not Available" />}
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "black",
                paddingRight: "70px",
                // marginTop:"12px"
              }}
            >
              Delivery Options
            </div>
          </Button>
          <Stack>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={changeDeliveryOptionsHandler}
                    checked={newDeliveryOption === 0}
                    style={{
                      color: "#31BA2E",
                    }}
                    value="del"
                  />
                }
                label={
                  <Typography variant="h8" style={{ color: "Black" }}>
                    Local Touch point pickup
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newDeliveryOption === 1}
                    onChange={changeDeliveryOptionsHandler}
                    // onChange={this.handleChange("cryon")}
                    style={{
                      color: "#31BA2E",
                    }}
                    value="self"
                  />
                }
                label={
                  <Typography variant="h8" style={{ color: "Black" }}>
                    Self Pickup
                  </Typography>
                }
              />
            </div>
            {/* <div>ok</div> */}
          </Stack>
        </div>
        <div style={{ width: "50vw" }}>
          {width >= 804 && <OptionalComponent />}
        </div>
      </Box>
    </>
  );
}
export default MiddleComponent;
