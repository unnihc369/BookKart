import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { UserState } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BooksPage = () => {
  const { allbooks, user, handlerSearch } = UserState();
  // console.log(allbooks);
  const navigate = useNavigate();
  const handleAddcart = async (el) => {
    if (!el) {
      return;
    }

    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/cart/addCart`, {
        bookId: el.book_id,
        userId: user.user_id,
      });
      if (data) {
        let hey = window.confirm("view a cart");
        if (hey === true) {
          navigate("/cart");
        }
      }
    } catch (error) {
      console.log(error);
      window.alert("at book page addcart");
    }
  };

  // const [tag,setTag]=useState();

  return (
    <>
      <NavBar />
      <section
        className="featured"
        id="featured"
        style={{ marginBottom: "20px" }}
      >
        <h1 className="heading">
          {" "}
          <span>
            <select
              name="book-category"
              id="book-category"
              onChange={(e) => {
                console.log(e.target.value + "praveeen --->");
                handlerSearch(e.target.value);
                // setTag(e.target.value+" pr");
              }}
            >
              <option value="">All Books</option>
              <option value="technical">Technical Books</option>
              <option value="fantasy">Fantasy Books</option>
              <option value="non-friction">non friction</option>
              <option value="story">Story</option>
              <option value="general">General Books</option>
            </select>
          </span>{" "}
        </h1>

        <div className="swiper featured-slider" style={{ overflow: "auto" }}>
          <div className="swiper-wrapper hey">
            {Array.isArray(allbooks) && allbooks.length > 0 ? (
              allbooks.map((el) => (
                <Link
                  to={`/book/${el.book_id}`}
                  key={el.id}
                  className="swiper-slide box"
                >
                  <div className="icons">
                    <h1>{el.author}</h1>
                  </div>
                  <div className="image">
                    <a href="./product.html">
                      <img src={el.url} alt={el.name} />
                    </a>
                  </div>
                  <div className="content">
                    <h3>{el.name}</h3>
                    <div className="price">
                      ₹{el.amount} <span>{el.amount + 100}</span>
                    </div>

                    {user ? (
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddcart(el);
                        }}
                      >
                        add to cart
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BooksPage;
