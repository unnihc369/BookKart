import React, { useState } from "react";
import { Link ,useLocation, useNavigate} from "react-router-dom";
import "./index.css"; // Assuming you have the CSS in a separate file
import { UserState } from "../context/UserContext";

function NavBar() {

  const location=useLocation();
  const navigate=useNavigate();
   const { user, load, setLoad, handlerSearch } = UserState();
    const [search,Setsearch]=useState();

    //  if (!search) {
    //    handlerSearch();
    //  }


  return (
    <>
      <header className="header">
        <div className="header-1">
          <Link to="/" className="logo">
            <i className="fas fa-book"></i> BookKart
          </Link>

          {location.pathname === "/books" && (
            <form action="" className="search-form">
              <input
                type="search"
                name=""
                placeholder="search here..."
                id="search-box"
                value={search}
                onChange={(e) => Setsearch(e.target.value)}
              />
              <label
                className="fas fa-search"
                onClick={(e) => {
                  e.preventDefault();
                  handlerSearch(search);
                }}
              ></label>
            </form>
          )}

          <div className="icons">
            <div id="search-btn" className="fas fa-search"></div>
            {user && user.name !== "admin" ? (
              <Link to="/cart" className="fas fa-shopping-cart"></Link>
            ) : (
              <></>
            )}
            {user&&user.name==="admin" ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("user");
                  setLoad(!load);
                  navigate("/");
                  window.location.reload();
                }}
              >
                logout
              </a>
            ) : (
              <></>
            )}
            {!user ? (
              <Link to={"/login"}>Login</Link>
            ) : (
              <Link to={"/user"} id="login-btn" className="fas fa-user"></Link>
            )}
          </div>
        </div>

        {user && user.name !== "admin" && (
          <div className="header-2">
            <nav className="navbar">
              <Link to="/">home</Link>
              <a href="#featured">featured</a>
              {user ? <Link to="/books">books</Link> : <></>}
              {user ? <Link to="/cart">Cart</Link> : <></>}
              {user ? (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("user");
                    setLoad(!load);
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  logout
                </a>
              ) : (
                <></>
              )}
              {/* <a href="#reviews">reviews</a> */}
              {/* <Link to="/feedback">feedback</Link> */}
            </nav>
          </div>
        )}
      </header>
      <nav className="bottom-navbar">
        <Link to="/#home" className="fas fa-home"></Link>
        <Link to="/#featured" className="fas fa-list"></Link>
        <Link to="/#arrivals" className="fas fa-tags"></Link>
        <Link to="/#reviews" className="fas fa-comments"></Link>
        <Link to="/#feedback" className="fas fa-feedback"></Link>
      </nav>
    </>
  );
}

export default NavBar;
