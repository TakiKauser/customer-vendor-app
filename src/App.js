import './App.css';
import React from "react";
// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import {BrowserRouter, Router, Routes, Route} from "react-router-dom";

// import { Container, Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';
// import Menubar from './components/Shared/Menubar/Menubar';
import Home from './components/Home/Home';
import CustomerPage from './components/Pages/Parties/Customer/CustomerPage';
import VendorPage from './components/Pages/Parties/Vendor/VendorPage';
import Category from './components/Pages/Products/Category/Category';
import Product from './components/Pages/Products/Products/Product';
import Purchase from './components/Pages/Purchase/Purchase';
import HsCode from './components/Pages/HS-Code/HsCode';
import ProductList from './components/Pages/Products/Product-List/ProductList';
// import { NavLink } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Menubar />}> */}
          <Route path="/" element={<Home />} />

          <Route path="customer" element={<CustomerPage />} />
          <Route path="customer_list" element={<CustomerPage />} />

          <Route path="vendor" element={<VendorPage />} />
          <Route path="vendor_list" element={<VendorPage />} />

          <Route path="category" element={<Category />} />
          <Route path="category_list" element={<VendorPage />} />

          <Route path="products" element={<Product />} />
          <Route path="product_list" element={<ProductList />} />

          <Route path="hsCode" element={<HsCode />} />

          <Route path="purchase" element={<Purchase />} />

          {/* <Route path="teams" element={<Teams />}> */}
          {/* <Route path=":teamId" element={<Team />} /> */}
          {/* <Route path="new" element={<NewTeamForm />} /> */}
          {/* <Route index element={<LeagueStandings />} /> */}
      </Routes>
    </BrowserRouter>
      
    </div >
  );
}

export default App;
