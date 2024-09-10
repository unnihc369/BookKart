import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import axios from "axios";

const AdminPage = () => {
  const [allbooks, SetAllbooks] = useState();
  const [load, setLoad] = useState(false);
  const { user } = UserState();

  const getalladdedbooks = async () => {
    try {
      const data = await axios.get(`http://127.0.0.1:5000/addbook/all`);
      if (data) {
        //  s(data.data);
        // console.log(data.data.data.addbooks);
        SetAllbooks(data.data.data.addbooks);
      }
    } catch (error) {
      SetAllbooks([]);
      //    console.log("error");
    }
  };

  const sendMail = async (el) => {
     if(!el){
        //  window.alert("please provide the all deti")
        return;
     }
try {
  const data = await axios.post(`http://127.0.0.1:5000/send-email/`,{
    to:el.to,
    subject:el.subject,
    body:el.body
  });
  if (data) {
  
    console.log("mail sent successfulyy");
  }
} catch (error) {
//   SetAllbooks([]);
  //    console.log("error");
  console.log("main sent error");
}
     
  };

  const handleDelete = async (el) => {
    if (!el) {
      window.alert("some thing went wrong");
      return;
    }

    try {
      const data = await axios.delete(
        `http://127.0.0.1:5000/addbook/delete/${el.addbook_id}`
      );
      if (data) {
        window.alert("request rejected  successfully");
        sendMail({
          to: el.email,
          subject: "Publishing Your book",
          body: `Hi ${el.author} ...\n thank you for contacting ur .. we are regret to inform that we are not ready to take you book ... `,
        });
        setLoad(!load);
      }
    } catch (error) {
      window.alert("error in deleting");
    }
  };

  const addbook=async(el)=>{

    try {
      const data = await axios.post(`http://127.0.0.1:5000/books/add`, {
        name:el.bookname,
        author: el.author,
        amount: el.amount+10,
        tag: el.tag,
        url: el.url,
        about:el.about,
      });
      if (data) {
        //  s(data.data);
        // console.log(data.data.data.addbooks);
        // SetAllbooks(data.data.data.addbooks);
        console.log("book added successfully");

      }
    } catch (error) {
    //   SetAllbooks([]);
    console.log("error in adding book");
      //    console.log("error");
    }
  }

  const handleAccpet = async (el) => {
    try {
      const data = await axios.delete(
        `http://127.0.0.1:5000/addbook/accept/${el.addbook_id}`
      );
      if (data) {
        window.alert("contact information sent successfully");
        sendMail({to:el.email,subject:"Publishing Your book",body:`Hi ${el.author} ...\n thank you for contacting ur .. we are happy to inform that we are ready to take you book .. our team will contact you soon .. \n thank you `});
        addbook(el);
        setLoad(!load);
      }
    } catch (error) {
      window.alert("error in accepting");
    }
  };

  useEffect(() => {
    getalladdedbooks();
  }, [load]);

  return (
    <section
      className="featured"
      id="featured"
      style={{ marginBottom: "20px" }}
    >
      <h1 className="heading">
        {" "}
        <span>All Requested books</span>{" "}
      </h1>

      <div className="swiper featured-slider" style={{ overflow: "auto" }}>
        <div className="swiper-wrapper hey">
          {Array.isArray(allbooks) && allbooks.length > 0 ? (
            allbooks.map((el) => (
              <div className="swiper-slide box">
                <div className="icons">
                  <h1>author name : {el.author}</h1>
                  <p>email : {el.email}</p>
                  <p>phone :{el.phone}</p>
                </div>
                <div className="image">
                  <div>
                    <img src={el.url} />
                  </div>
                </div>
                <div className="content">
                  <h3>name:{el.bookname}</h3>
                  <h2>tag:{el.tag}</h2>
                  <div className="price">price:₹{el.amount}</div>
                  <p>about : {el.about}</p>

                  <button
                    className="btn"
                    style={{ width: "150px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAccpet(el);
                    }}
                  >
                    approve
                  </button>

                  <button
                    className="btn"
                    style={{ backgroundColor: "red", width: "150px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(el);
                    }}
                  >
                    reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books added</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
