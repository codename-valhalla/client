import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  mainHeading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },  
  link: {
    display: 'inline-block',
    marginRight: theme.spacing(2)
  }
}));

const HomePage = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:3000/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.mainHeading} align="center">
              Welcome to Valhalla!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {categories.map(category => (
              <Link to={`/category/${category._id}`} key={category.id}>
                <Typography variant="body1" className={classes.link}>{category.name}</Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
      </div>
  );
};

export default HomePage;
