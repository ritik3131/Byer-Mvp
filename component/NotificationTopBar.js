import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoSVG from "../Resources/logo.svg";
import BellIconSVG from "../Resources/BellIcon.svg";
import {
  Collapse,
  Fab,
  Grid,
  List,
  ListItem,
  Slide,
  Stack,
  Zoom,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function ButtonAppBar(props) {
  const size = useWindowSize();
  const width = size.width;
  const [showList, setShowList] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const NewIcons = [
    {
      icons: (
        <DehazeIcon
          style={{ color: "#31BA2E", height: "50px", width: "50px" }}
          onClick={() => setValue(1)}
        />
      ),
    },
    {
      icons: (
        <CloseIcon
          style={{ color: "#31BA2E", height: "50px", width: "50px" }}
          onClick={() => setValue(0)}
        />
      ),
    },
  ];
  const options = ["Notifications"];
  return (
    <Box sx={{ flexGrow: 1, paddingTop: "20px" }} style={props.style}>
      <AppBar
        elevation={0}
        position="static"
        style={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={LogoSVG.src}
              alt="SVG logo image"
              height="61px"
              width="127px"
            />
          </Typography>
          {width > 943 ? (
            <Box display="flex" justifyContent={`flex-end`}>
              <Grid
                container
                spacing={"100px"}
                justifyContent="right"
                style={{ backgroundColor: "" }}
              >
                {/* <Grid item xs={3} justifyContent="flex-start">
                  <Button color="inherit">
                    <Typography
                      style={{ color: "#31BA2E" }}
                      sx={{ fontWeight: "bold" }}
                    >
                      Terms & conditions
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button color="inherit">
                    <Typography
                      style={{ color: "#31BA2E" }}
                      sx={{ fontWeight: "bold" }}
                    >
                      Support
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button color="inherit">
                    <Typography
                      style={{ color: "#31BA2E" }}
                      sx={{ fontWeight: "bold" }}
                    >
                      About
                    </Typography>
                  </Button>
                </Grid> */}
                <Grid item xs={12}>
                  <Button
                    color="inherit"
                    href="/phone-auth"
                    variant="outlined"
                    style={{ borderColor: "#e3e5e5", borderWidth: "2px" }}
                    startIcon={<img src={BellIconSVG.src} />}
                  >
                    <Typography
                      style={{ color: "black" }}
                      sx={{ fontWeight: "bold" }}
                    >
                      Notification
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <>
              {NewIcons.map((elem, index) => (
                <Zoom
                  key={index}
                  in={value === index}
                  //   in={1}
                  timeout={transitionDuration}
                  style={{
                    transitionDelay: `${
                      value === index ? transitionDuration.exit : 0
                    }ms`,
                  }}
                  unmountOnExit
                >
                  {elem.icons}
                </Zoom>
              ))}
              {1 ? (
                <div
                  style={{
                    backgroundColor: "",
                    marginTop: "90px",
                    right: 22,
                    position: "absolute",
                  }}
                >
                  <Stack spacing={"22px"} style={{ backgroundColor: "" }}>
                    {options.map((elem, index) => {
                      return (
                        <Slide
                          direction="up"
                          orientation="vertical"
                          in={value}
                          style={{
                            transitionDelay:
                              value === 1
                                ? `${index * 2}00ms`
                                : `${index / 2}00ms`,
                          }}
                          unmountOnExit
                        >
                          <Button
                            color="inherit"
                            href="/phone-auth"
                            variant="outlined"
                            style={{
                              borderColor: "#e3e5e5",
                              borderWidth: "2px",
                            }}
                            startIcon={<img src={BellIconSVG.src} />}
                          >
                            <Typography
                              style={{ color: "black" }}
                              sx={{ fontWeight: "bold" }}
                            >
                              Notification
                            </Typography>
                          </Button>
                        </Slide>
                      );
                    })}
                  </Stack>
                </div>
              ) : null}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
