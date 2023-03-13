import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    // Additional code to clear local storage or reset state can go here
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Button color="inherit" style={{ color: 'white' }}>Shop</Button>
        </Typography>
        {!user ? (
          <>
            <Link to="/login">
              <Button color="inherit" style={{ color: 'white' }}>Login</Button>
            </Link>
            <Link to="/signup">
              <Button color="inherit" style={{ color: 'white' }}>Signup</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h6" className={classes.title}>
              Welcome, {user.firstName}
            </Typography>
            <Button color="inherit" style={{ color: 'white' }} onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
    </div>
  );
}
