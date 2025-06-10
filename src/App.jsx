


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Createcategory from "./pages/CreateCategory";
import Navbar from "./components/Navbar";
import Subcategory from "./pages/subcategory";
import Login from "./pages/login";
import Product from './pages/product';
import Profile from "./pages/profile";
import ProductDetail from "./pages/productdetail";
import Createuser from "./pages/createUser";
import Add_Subcategory from "./pages/Add_subcategory";
import Add_Product from "./pages/Add_product";
import EditCategory from "./pages/EditCategory";
import SearchResults from "./pages/SearchResults";
import Buy_Now from "./pages/Buy_Now";
import Order from "./pages/Order";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createcategory/" element={<Createcategory />} /> 
        <Route path="/subcategory/:id" element={<Subcategory/>}/>
        <Route path="/login/" element={<Login />} />   
        <Route path="/product/:id/" element={<Product />} />
        <Route path="/product_detail/:id/" element={<ProductDetail />} /> 
        <Route path="/profile/" element={<Profile />} />
        <Route path="/createuser/" element={<Createuser />} /> 
        <Route path="/create-Sub-cat/:id" element={<Add_Subcategory />} />
        <Route path="/add-product/:id" element={<Add_Product />} />
        <Route path="/edit-category/:id" element={<EditCategory />} /> 
        <Route path="/buy-now/:productId" element={<Buy_Now />} />
        <Route path="/search" element={<SearchResults />} />    
        <Route path="/order-history/" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
