import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import "./cart.css"
import { use } from 'react';
import { UserState } from '../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {


  const [total,setTotal]=useState(0);
  const  [cart,setCart]=useState([]);
  const { user, load, setLoad } = UserState();
  const navigate=useNavigate();
  const handleOrders=async(e)=>{
      sessionStorage.setItem("amount", JSON.stringify(total));
      sessionStorage.setItem('cart',JSON.stringify(cart));
      navigate('/payment');
  }


  const handleGetAllCart = async (e) => {
    // e.preventDefault();
    if (!user || !user.user_id) {
      // console.log("please provide the documnet");
      // window.alert("please provide all documents");

      return;
    }
    try {
      const { data } = await axios.get(`http://127.0.0.1:5000/cart/getCart/${user.user_id}`);

      if(data){
        setCart(data.data);
        let t=0;
         data.data.forEach(element => {
          t+=element.amount;
         });
         setTotal(t);
      }

      
    } catch (error) {
      window.alert("error in login page");
    }
  };

  const handleremovecart=async(cartId)=>{
        
    if(!cartId){
      window.alert("please provide the cart Id")
      return;
    }

      const { data } = await axios.delete(
        `http://127.0.0.1:5000/cart/delcart/${cartId}`
      );

      if(data){
        window.alert("remove from cart");
        setLoad(!load);
      }


  }


  useEffect(() => {
    handleGetAllCart();
  }, [load])
  

  return (
    <>
      <NavBar />

      <div className="container">
        <section id="cart">
          {(cart &&
            cart.length !== 0)? 
            cart.map((el) => (
              <article className="product" key={el.cartId}>
                <header>
                  <button className="remove" onClick={()=>handleremovecart(el.cartId)}>
                    <img src={el.url} alt="" />
                    <h3>Remove product</h3>
                  </button>
                </header>
                <div className="content">
                  <h1>{el.name}</h1>
                  <p>{el.author}</p>
                </div>
                <footer className="content">
                  {/* <span className="qt-minus">-</span>
                  <span className="qt">2</span>
                  <span className="qt-plus">+</span> */}
                  {/* {t+=el.amount} */}
                  <h2 className="full-price">{el.amount}₹</h2>
                  {/* <h2 className="price">{el.amount}₹</h2> */}
                </footer>
              </article>
            )):<h1>Empty cart  <Link to='/books'>add book</Link></h1>}
        </section>
      </div>

      <footer id="site-footer">
        <div class="container clearfix">
          <div class="left">
            {/* <h2 class="subtotal">
              Subtotal: <span>163.96</span>₹
            </h2>
            <h3 class="tax">
            
              Taxes (5%): <span>8.2</span>₹
            </h3>
            <h3 class="shipping">
              Shipping: <span>5.00</span>₹
            </h3> */}
          </div>

          <div class="right">
            <h1 class="total">
              Total: <span>{total}</span>₹
            </h1>
            <button class="btn" onClick={handleOrders}>Payment</button>
          </div>
        </div>
      </footer>
      <Footer />
    </>
  );
}

export default CartPage