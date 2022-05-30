import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PayWithPhone from "../Resources/PayByPhone.svg";
import PayWithCash from "../Resources/cod.png";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Button, Typography } from "@mui/material";
export default function CheckboxList({ onSelect }) {
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1 && checked.length === 0) {
      newChecked.push(value);
    } else if (currentIndex === -1) {
      newChecked.pop();
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    onSelect(newChecked[0]);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[
        { photo: PayWithPhone, name: "Online Payment", value: 0 },
        { photo: PayWithCash, name: "Pay With Cash", value: 1 },
      ].map((value) => {
        const labelId = `checkbox-list-label-${value.value}`;

        return (
          <ListItem key={value.value} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value.value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              </ListItemIcon>
              <Button
                variant="filled"
                fullWidth
                startIcon={
                  <img
                    src={value.photo.src}
                    alt="ok"
                    style={{ marginLeft: "-40px" }}
                  />
                }
                style={{
                  //   marginTop: "20px",
                  backgroundColor: "#31BA2E",
                  color: "white",
                  //   marginBottom: "350px",
                }}
              >
                <Typography style={{ fontWeight: "800" }}>
                  {value.name}
                </Typography>
              </Button>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
