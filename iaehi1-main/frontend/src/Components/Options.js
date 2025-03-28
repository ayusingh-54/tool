import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@material-ui/core/Typography";

export default function Options(props) {
  const { value, setValue, language } = props;

  const styleObj = {
    color: "white",
    marginLeft: "1rem",
    marginBottom: "0",
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="options"
        name="options"
        value={value || ""}
        onChange={handleChange}
      >
        <FormControlLabel
          value="opta"
          control={<Radio />}
          label={
            <Typography style={styleObj} variant="h6" gutterBottom>
              {language === "hi" && props.optaHindi
                ? props.optaHindi
                : props.opta}
            </Typography>
          }
        />
        <FormControlLabel
          value="optb"
          control={<Radio />}
          label={
            <Typography style={styleObj} variant="h6" gutterBottom>
              {language === "hi" && props.optbHindi
                ? props.optbHindi
                : props.optb}
            </Typography>
          }
        />
        <FormControlLabel
          value="optc"
          control={<Radio />}
          label={
            <Typography style={styleObj} variant="h6" gutterBottom>
              {language === "hi" && props.optcHindi
                ? props.optcHindi
                : props.optc}
            </Typography>
          }
        />
        <FormControlLabel
          value="optd"
          control={<Radio />}
          label={
            <Typography style={styleObj} variant="h6" gutterBottom>
              {language === "hi" && props.optdHindi
                ? props.optdHindi
                : props.optd}
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
