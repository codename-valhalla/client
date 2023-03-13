import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const LoginForm = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLocalLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        const user = res.data.user;        
        dispatch({ type: "LOG_IN", user });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const responseFacebook = (response) => {
    axios
      .post("http://localhost:3000/users/facebook-login", {
        access_token: response.accessToken,
      })
      .then((res) => {
        const user = res.data.user;        
        dispatch({ type: "LOG_IN", user });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleLocalLogin}>
        <TextField
          required
          fullWidth
          label="Email"
          value={email}
          onChange={handleEmailChange}
          className={classes.textField}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login with Email
        </Button>
        <FacebookLogin
          appId="1164724940899 293"
          fields="name,email, picture"
          callback={responseFacebook}
          className={classes.button}
        />
      </form>
    </div>
  );
};

export default LoginForm;
