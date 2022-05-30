import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import div from "@mui/material/div";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NewSearchBar from "./newSearchBar";
import Cart from "../Resources/ShoppingCart.svg";
import MoreIcon from "@mui/icons-material/MoreVert";
import BYERSVG from "../Resources/logo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FourSquares from "../Resources/4Squares.svg";
import SearchIcon from "@mui/icons-material/Search";
import Heart from "../Resources/Heart.svg";
import DownTriangle from "../Resources/downTriangle.svg";

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
  width: "100%",
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
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const size = useWindowSize();
  const width = size.width;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          props.routerToProfile();
          handleMenuClose;
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.routerToStoreKyc();
          handleMenuClose;
        }}
      >
        Store KYC
      </MenuItem>
      {props && props.isAdmin && (
        <MenuItem
          onClick={() => {
            props.routerToAdmin();
            handleMenuClose;
          }}
        >
          Admin Portal
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  function OptionalComponent(props) {
    const size = useWindowSize();
    const width = size.width;
    return (
      <>
        {width <= 1526 && (
          // <Search style={{ backgroundColor: "#F3F3F3" }}>
          //   {1 && (
          //     <SearchIconWrapper>
          //       <div
          //         style={{
          //           fontWeight: "900",
          //           color: "black",
          //           paddingRight: "20px",
          //         }}
          //       >
          //         All Categories{" "}
          //       </div>
          //       <KeyboardArrowDownIcon
          //         style={{
          //           marginTop: "0px",
          //           marginLeft: "-16px",
          //           color: "black",
          //         }}
          //       />
          //     </SearchIconWrapper>
          //   )}{" "}
          //   <StyledInputBase
          //     placeholder="Search for items..."
          //     inputProps={{ "aria-label": "search", color: "black" }}
          //     // style={{ marginLeft: "150px" }}
          //   />
          //   {1 && (
          //     <IconButton
          //       size="large"
          //       edge="end"
          //       color="inherit"
          //       aria-label="open drawer"
          //       style={{
          //         backgroundColor: "#31BA2E",
          //         // marginRight: "-10px",
          //         zIndex: "1",
          //         borderRadius: "2px",
          //       }}
          //       sx={{ mr: 2 }}
          //     >
          //       {/* <img src={BYERSVG.src} height={`20px`} width={`20px`} alt="Sorry Image Not Available" /> */}
          //       {/* <div style={{ backgroundColor: "#31BA2E", marginRight: "-30px" }}> */}
          //       <SearchIcon />
          //       {/* </div> */}
          //     </IconButton>
          //   )}{" "}
          // </Search>
          <NewSearchBar width={false} />
        )}
      </>
    );
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="success">
            <img src={Heart.src} alt="Sorry Image Not Available" />
          </Badge>
        </IconButton>
        <p>WishList</p>
      </MenuItem>
      <MenuItem>
        <Button onClick={() => props.routerToCartHandler()}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={props.cartCount} color="success">
              {/* <NotificationsIcon /> */}
              <img src={Cart.src} alt="ok" />
            </Badge>
          </IconButton>
          <p>My Cart</p>
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button onClick={() => props.routerToProfile()}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </Button>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          style={{ marginRight: "" }}
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Button
            variant="outlined"
            style={{
              marginTop: "20px",
              // backgroundColor: "#31BA2E",
              borderColor: "#31BA2E",
              borderWidth: "2px",
              color: "white",
              marginTop: "-10px",
              // marginBottom: "20px",
            }}
            endIcon={<img src={DownTriangle.src} alt="Sorry Not Available" />}
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "black",
              }}
            >
              Your Biz
            </div>
          </Button>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        style={{
          backgroundColor: "white",

          // backgroundColor: "blue",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img src={BYERSVG.src} alt="Sorry Image Not Available" />
          </IconButton>
          <div
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          ></div>
          {width >= 1526 && (
            // <Search style={{ backgroundColor: "#F3F3F3" }}>
            //   <SearchIconWrapper>
            //     <div
            //       style={{
            //         fontWeight: "900",
            //         color: "black",
            //         paddingRight: "20px",
            //       }}
            //     >
            //       All Categories{" "}
            //     </div>
            //     <KeyboardArrowDownIcon
            //       style={{
            //         marginTop: "0px",
            //         marginLeft: "-16px",
            //         color: "black",
            //       }}
            //     />
            //   </SearchIconWrapper>
            //   <StyledInputBase
            //     placeholder="Search for items..."
            //     inputProps={{ "aria-label": "search", color: "black" }}
            //     style={{ marginLeft: "150px" }}
            //   />
            //   <IconButton
            //     size="large"
            //     edge="end"
            //     color="inherit"
            //     aria-label="open drawer"
            //     style={{
            //       backgroundColor: "#31BA2E",
            //       marginRight: "-10px",
            //       zIndex: "1",
            //       borderRadius: "2px",
            //     }}
            //     sx={{ mr: 2 }}
            //   >
            //     {/* <img src={BYERSVG.src} height={`20px`} width={`20px`} alt="Sorry Image Not Available" /> */}
            //     {/* <div style={{ backgroundColor: "#31BA2E", marginRight: "-30px" }}> */}
            //     <SearchIcon />
            //     {/* </div> */}
            //   </IconButton>
            // </Search>
            <NewSearchBar />
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              style={{ marginRight: "40px" }}
            >
              <Badge badgeContent={4} color="success">
                <img src={Heart.src} alt="Sorry Image Not Available" />
              </Badge>
              <div
                style={{
                  fontFamily: "Roboto",
                  color: "black",
                  size: "12px",
                  marginLeft: "12px",
                }}
              >
                WishList
              </div>
            </IconButton> */}
            <IconButton
              onClick={() => props.routerToCartHandler()}
              style={{ marginRight: "40px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={props.cartCount} color="success">
                {/* <NotificationsIcon /> */}

                <img src={Cart.src} alt="ok" />
              </Badge>
              <div
                style={{
                  fontFamily: "Roboto",
                  color: "black",
                  size: "12px",
                  marginLeft: "12px",
                }}
              >
                My cart
              </div>
            </IconButton>
            <IconButton
              size="large"
              style={{ marginRight: "" }}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
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
                endIcon={
                  <img src={DownTriangle.src} alt="Sorry Not Available" />
                }
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    color: "black",
                  }}
                >
                  Your Biz
                </div>
              </Button>
            </IconButton>

            <IconButton
              size="large"
              style={{}}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Button
                variant="filled"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#31BA2E",
                  color: "white",
                  marginBottom: "20px",
                }}
                startIcon={
                  <img src={FourSquares.src} alt="Sorry Not Available" />
                }
              >
                <div style={{ fontWeight: "600", fontSize: "12px" }}>
                  Browse All Categories
                </div>
              </Button>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* <OptionalComponent/> */}
      {width <= 1525 && <OptionalComponent />}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
