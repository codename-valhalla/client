import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
}));

const SignUpForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the data to the server
    axios
      .post("http://localhost:3000/users/signup", {
        firstName,
        lastName,
        contact,
        email,
        password,
      })
      .then((res) => {
        setOpen(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant="h5">User Registration</Typography>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Added</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default SignUpForm;
