import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginForm from "./components/LoginForm";
import BooksPage from "./Pages/BooksPage";
import CartPage from "./components/CartPage";
import UserPage from "./Pages/UserPage";
import SignUp from "./components/SignUp";
import BooksShowPage from "./Pages/BooksShowPage";
import AddBookPage from "./Pages/AddBookPage";
import PaymentPage from "./Pages/PaymentPage";

function App() {
  return (
    <>
 
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/books" element={<BooksPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/addbook" element={<AddBookPage />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/book/:id" element={<BooksShowPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
