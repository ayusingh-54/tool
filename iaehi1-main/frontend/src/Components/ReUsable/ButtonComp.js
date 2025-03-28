import React from "react";
import Button from "@mui/material/Button";
import Style from "./ButtonComp.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function ButtonComp(props) {
  const {disabled} = props
  let theme = createTheme({
    palette: {
      primary: {
        main: "#ffc815",
      },
    },
    shape: {
      borderRadius: 50,
    },
  });
  return (
    <div className={Style.container}>
      <ThemeProvider theme={theme}>
        <Button
          disabled = {disabled}
          variant="contained"
          onClick={props.onClick}
          endIcon={props.endIcon || null}
          color="primary"
        >
          {props.title}
        </Button>
      </ThemeProvider>
    </div>
  );
}
