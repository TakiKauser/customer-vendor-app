import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Menubar from './components/Shared/Menubar/Menubar';
import Home from './components/Home/Home';
import CustomerPage from './components/Pages/Parties/Customer/CustomerPage';
import VendorPage from './components/Pages/Parties/Vendor/VendorPage';
import Category from './components/Pages/Products/Category/Category';
import Product from './components/Pages/Products/Products/Product';
import Purchase from './components/Pages/Purchase/Purchase';
import HsCode from './components/Pages/HS-Code/HsCode';
import ProductList from './components/Pages/Products/Product-List/ProductList';
import initAuth from './components/UserAuth/Firebase/firebase.init';
import PurchaseList from './components/Pages/PurchaseList/PurchaseList';
import ProductDetails from './components/Pages/ProductDetails/ProductDetails';
import CustomerList from './components/Pages/Parties/Customer-List/CustomerList';
import VendorList from './components/Pages/Parties/Vendor-List/VendorList';
import HSCodeList from './components/Pages/HSCodeList/HSCodeList';
import Sales from './components/Pages/Sales/Sales';
import SalesList from './components/Pages/SalesList/SalesList';

initAuth();

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Menubar />}> */}
          <Route path="/" element={<Home />} />

          <Route path="customer" element={<CustomerPage />} />
          <Route path="customer_list" element={<CustomerList />} />

          <Route path="vendor" element={<VendorPage />} />
          <Route path="vendor_list" element={<VendorList />} />

          <Route path="category" element={<Category />} />
          <Route path="category_list" element={<VendorPage />} />

          <Route path="products" element={<Product />} />
          <Route path="product_list" element={<ProductList />} />

          <Route path="hsCode" element={<HsCode />} />
          <Route path="hsCode_list" element={<HSCodeList />} />

          <Route path="purchase" element={<Purchase />} />
          <Route path="purchase_invoice_list" element={<PurchaseList />} />
          <Route path="productDetails/:itemNumber" element={<ProductDetails />} />

          <Route path="sales" element={<Sales />} />
          <Route path="sales_invoice_list" element={<SalesList />} />
          {/* <Route path="productDetails/:itemNumber" element={<ProductDetails />} /> */}

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
