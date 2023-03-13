import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  productCard: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
  },
}));

function CategoryPage(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/category/${categoryId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Products in Category</Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <div className={classes.productCard}>
              <img
                className={classes.productImage}
                src={product.image}
                alt={product.name}
              />
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CategoryPage;
