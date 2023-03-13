import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FileBase64 from "react-file-base64";

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },    
  }));

const NewProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    brand: '',
    weight: '',
    dimensions: '',
    category: '',
    reviews: [],
    image: '',
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const classes = useStyles();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:3000/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/products", product);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (file) => {
    const imageFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (imageFileTypes.includes(file.type)) {
      setProduct({ ...product, image: file.base64 });
    } else {
      alert('Invalid file type. Please upload an image file (jpeg, png, gif).');
    }   
  };    

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setProduct({ ...product, category: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Stock"
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Brand"
        name="brand"
        value={product.brand}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Weight"
        name="weight"
        value={product.weight}
        onChange={handleChange}
        className={classes.textField}
      />
      <TextField
        label="Dimensions"
        name="dimensions"
        value={product.dimensions}
        onChange={handleChange}
        className={classes.textField}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
        {categories.map(category => (
          <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
        <InputLabel htmlFor="file">Upload Image</InputLabel>
        <FileBase64 id="file"
          onDone={handleFileUpload} />
      <Button type="submit">Submit</Button>
      
    </form>
  );
};

export default NewProductForm;
