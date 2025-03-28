import React, { useState, useEffect } from "react";
import {} from "react-router-dom";
import { ageGroups, departments, genderGroups } from "./Data/variables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Style from "./FormDialog.module.css";
import ButtonComp from "./ReUsable/ButtonComp";
import InputComp from "./ReUsable/InputComp";
import SelectionComp from "./ReUsable/SelectionComp";
import RadioGroup from "./ReUsable/RadioGroup";
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "./Data/apiData";
import { useLanguage } from "../contexts/LanguageContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffc815",
    },
  },
});

export default function FormDialog({
  open,
  onClose,
  title,
  setMsg,
  setUserData,
}) {
  const [data, setData] = useState("");
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [departmentValue, setDepartmentValue] = useState("");
  const [ageGroupValue, setAgeGroupValue] = useState("");
  const [gender, setGender] = useState(genderGroups[0].id);
  const [error, setError] = useState(false);
  const { t, language } = useLanguage();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const emails = res.data.map((e) => e.email);
        setData(emails);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const userNameHandle = (e) => {
    const input = e.target.value;
    if (input === null || input.length < 3) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
      setUsername(input);
    }
  };

  const emailHandle = (e) => {
    const input = e.target.value;
    const validated = validateEmail(input);
    if (input === null || input === "" || !validated) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
      setEmail(input);
    }
  };

  const handleDepartmentChange = (event) => {
    setDepartmentValue(event.target.value);
  };

  const handleAgeGroupChange = (event) => {
    setAgeGroupValue(event.target.value);
  };

  const genderHandle = (event) => {
    setGender(event.target.value);
  };

  const submitHandle = () => {
    if (!error) {
      let dep;
      let gen;
      let age;
      if (data.includes(email)) {
        alert(
          language === "hi"
            ? t.alreadySubmitted
            : "Answers are already submitted from this email ID!"
        );
      } else {
        departments.forEach((e) => {
          if (e.id == departmentValue) {
            dep = language === "hi" && e.titleHindi ? e.titleHindi : e.title;
          }
        });
        ageGroups.forEach((e) => {
          if (e.id == ageGroupValue) {
            age = language === "hi" && e.titleHindi ? e.titleHindi : e.title;
          }
        });
        genderGroups.forEach((e) => {
          if (e.id == gender) {
            gen = language === "hi" && e.titleHindi ? e.titleHindi : e.title;
          }
        });
        navigate("/question");
        setUserData({
          username: username,
          email: email,
          department: dep,
          ageGroup: age,
          gender: gen,
          language: language,
        });
        sessionStorage.setItem("loggedin", 1);
        sessionStorage.setItem("admin", 0);
        setMsg(false);
      }
      onClose();
    } else alert(t.networkError);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dialog
          maxWidth="sm"
          fullWidth
          className={Style.dialog}
          open={open}
          onClose={onClose}
        >
          <div className={Style.dialogTitle}>
            <DialogTitle className={Style.dialogTitle}>
              <img className={Style.logo} src={logo} />
              {title}
            </DialogTitle>
            <IconButton
              onClick={onClose}
              style={{ color: "#ffc815", marginRight: "10px" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <DialogContent>
            <InputComp
              id="name"
              error={nameValidation}
              label={t.name}
              type="text"
              onChange={userNameHandle}
              helperText={t.nameLengthError}
            />
            <InputComp
              id="email"
              error={emailValidation}
              label={t.email}
              type="email"
              onChange={emailHandle}
              helperText={t.invalidEmailError}
            />
            <SelectionComp
              value={departmentValue}
              onChange={handleDepartmentChange}
              menuItems={departments}
              label={t.departments}
            />
            <SelectionComp
              value={ageGroupValue}
              onChange={handleAgeGroupChange}
              menuItems={ageGroups}
              label={t.ageGroups}
            />
            <RadioGroup onChange={genderHandle} menuItems={genderGroups} />
          </DialogContent>
          <DialogActions>
            <ButtonComp
              disabled={
                departmentValue === "" ||
                ageGroupValue === "" ||
                username === null ||
                email === null ||
                nameValidation ||
                emailValidation
              }
              title={t.submit}
              onClick={submitHandle}
            />
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
