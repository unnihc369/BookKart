import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Swiper from 'swiper'
import "./../components/style.css";
import image1 from "../image/book-1.png";
import image2 from "../image/book-2.png";
import image3 from "../image/book-3.png";
import image4 from "../image/book-4.png";
import image5 from "../image/book-5.png";
import image6 from "../image/book-6.png";
import image7 from "../image/stand.png";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { UserState } from "../context/UserContext";
import AdminPage from "./AdminPage";
const HomePage = () => {
 const {user}=UserState();
 console.log(user);

  return (
    <>
      <NavBar />
      {user && user.name === "admin" ? (
        <>
          <AdminPage />
        </>
      ) : (
        <>
          <section className="home" id="home">
            <div className="row">
              <div className="content">
                <h3>upto 75% off</h3>
                <p>
                  If you’re an Engineering student and need a books, Books4MU
                  has great deals on a wide range of books. Shop for these books
                  from top authors and avail hugely discounted prices
                </p>
                <a href="#" className="btn">
                  shop now
                </a>
              </div>

              <div className="swiper books-slider">
                <div className="swiper-wrapper">
                  <a href="#" className="swiper-slide">
                    <img src={image1} alt="" />
                  </a>
                  <a href="#" className="swiper-slide">
                    <img src={image2} alt="" />
                  </a>
                  <a href="#" className="swiper-slide">
                    <img src={image3} alt="" />
                  </a>
                </div>
                <img src={image7} className="stand" alt="" />
              </div>
            </div>
          </section>

          <section class="icons-container">
            <div class="icons">
              <i class="fas fa-shipping-fast"></i>
              <div class="content">
                <h3>free shipping</h3>
                <p>order over $100</p>
              </div>
            </div>

            <div class="icons">
              <i class="fas fa-lock"></i>
              <div class="content">
                <h3>secure payment</h3>
                <p>100 secure payment</p>
              </div>
            </div>

            <div class="icons">
              <i class="fas fa-redo-alt"></i>
              <div class="content">
                <h3>easy returns</h3>
                <p>10 days returns</p>
              </div>
            </div>

            <div class="icons">
              <i class="fas fa-headset"></i>
              <div class="content">
                <h3>24/7 support</h3>
                <p>call us anytime</p>
              </div>
            </div>
          </section>

          <section className="featured" id="featured">
            <h1 className="heading">
              {" "}
              <span>featured books</span>{" "}
            </h1>

            <div className="swiper featured-slider">
              <div className="swiper-wrapper hey">
                <div className="swiper-slide box">
                  <div className="icons">
                    <h1>pavan</h1>
                  </div>
                  <div className="image">
                    <Link to="/books">
                      {" "}
                      <img
                        src={
                          "https://images.thenile.io/r1000/9780321958327.jpg"
                        }
                        alt=""
                      />{" "}
                    </Link>
                  </div>
                  <div className="content">
                    <h3>The C++ Programming Language</h3>
                    <div className="price">
                      ₹720 <span>₹820</span>
                    </div>
                    {/* <a href="./cart.html" className="btn">
                  add to cart
                </a> */}
                  </div>
                </div>
                <div className="swiper-slide box">
                  <div className="icons">
                    <h1>lava</h1>
                  </div>
                  <div className="image">
                    <Link to="/books">
                      {" "}
                      <img
                        src={
                          "https://techworm.net/programming/wp-content/uploads/2018/07/51nws8VNsyL._SX373_BO1204203200_.jpg"
                        }
                        alt=""
                      />{" "}
                    </Link>
                  </div>
                  <div className="content">
                    <h3> Programming in ANSI</h3>
                    <div className="price">
                      ₹580 <span>₹680</span>
                    </div>
                    {/* <a href="./cart.html" className="btn">
                  add to cart
                </a> */}
                  </div>
                </div>
                <div className="swiper-slide box">
                  <div className="icons">
                    <h1>Praveen Kumar G</h1>
                  </div>
                  <div className="image">
                    <Link to="/books">
                      {" "}
                      <img src={image4} alt="" />{" "}
                    </Link>
                  </div>
                  <div className="content">
                    <h3>featured books</h3>
                    <div className="price">
                      ₹15.99 <span>₹20.99</span>
                    </div>
                    {/* <a href="./cart.html" className="btn">
                  add to cart
                </a> */}
                  </div>
                </div>
                <div className="swiper-slide box">
                  <div className="icons">
                    <h1>kusha</h1>
                  </div>
                  <div className="image">
                    <Link to="/books">
                      {" "}
                      <img
                        src={
                          "https://imgv2-2-f.scribdassets.com/img/word_document/317276308/original/adfe3e30f6/1585165423?v=1"
                        }
                        alt=""
                      />{" "}
                    </Link>
                  </div>
                  <div className="content">
                    <h3>Introduction to JAVA</h3>
                    <div className="price">
                      ₹389 <span>489</span>
                    </div>
                    {/* <a href="./cart.html" className="btn">
                  add to cart
                </a> */}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <Link className="btn" to="/books">
              load more
            </Link>
          </section>
        </>
      )}

      <Footer />
    </>
  );
};

export default HomePage;
