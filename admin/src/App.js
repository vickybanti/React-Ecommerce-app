
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { selectIsLoggedIn } from "./components/redux/userSlice";
import {useSelector} from 'react-redux'
function App() {

  const user = useSelector(selectIsLoggedIn)
  return (
    <Router>
    <TopBar />

      
      <div className="container">

        <SideBar />
        <Routes>
          <Route path="login" element={<Login />} />
          {user && (
          <><Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} /></>
   ) }
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
