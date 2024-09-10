import React, { useEffect } from "react";
import "./index.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { UserState } from "../context/UserContext";
import { use } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { user, setOrder, order } = UserState();

  const handleGetAllOrders = async (e) => {
    // e.preventDefault();
    if (!user || !user.user_id) {
      // console.log("please provide the documnet");
      // window.alert("please provide all documents");

      return;
    }
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/orders/getbyid/${user.user_id}`
      );

      if (data) {
        setOrder(data.data);
      }
    } catch (error) {
      // window.alert("error in login page");
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllOrders();
  }, []);
  // console.log(order);
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-section">
          <h2>User Profile</h2>
          <div className="profile-details">
            <img
              src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
              alt="User Photo"
              className="profile-photo"
            />
            <div className="info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          </div>
          <Link
            className="btn"
            to={"/addbook"}
            style={{ position: "absolute", right: "0%", top: "15%" }}
          >
            add book
          </Link>
        </div>
        <div className="order-section">
          <h2>Order Details</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>paymentUrl</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.length !== 0 &&
                order.map((el) => (
                  <tr>
                    <td>{el.orderId}</td>
                    <td>{el.bookName}</td>
                    <td>{el.quantity}</td>
                    <td>{el.amount}</td>
                    <td>{el.status}</td>
                    <td>{el.paymenturl}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
