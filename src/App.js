import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProductListing from "./components/ProductListing";
import NewProductForm from './components/NewProductForm';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import HomePage from './components/pages/home';
import CategoryPage from './components/pages/categories';

function App() {
  return (
    
    <div className="App">
      
      <Router>
      <Header/>
        <Routes>
          
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
          <Route path="/product" element={<NewProductForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignUpForm/>} />
          
        </Routes>
        <Footer/>
      </Router>  
      
    </div>
    
  );
}

export default App;
