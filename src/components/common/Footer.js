import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'fixed',
    bottom: 0,
    width: '100%',    
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  linkItem: {
    marginLeft: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.links}>
        <Link className={classes.linkItem} color="inherit" href="#">About</Link>
        <Link className={classes.linkItem} color="inherit" href="#">Contact Us</Link>
        <Link className={classes.linkItem} color="inherit" href="#">FAQ</Link>
      </div>
      <Typography variant="caption">
        Copyright &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
    </footer>
  );
}
