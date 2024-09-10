import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { UserState } from "../context/UserContext";
import axios from "axios";
import { layout } from "@chakra-ui/react";

const BooksShowPage = () => {
  const [comments, setComments] = useState();
  const [addCmt, setAddCmt] = useState();
  const [book, setBook] = useState();
  const [load, setload] = useState(false);

 const navigate = useNavigate();

  const handlerAddcmt = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/reviews/add`, {
        user_id: user.user_id,
        book_id: book.book_id,
        review: addCmt,
      });
      if (data) {
        window.alert("comment added successfully");
        setload(!load);
      }
    } catch (error) {
      window.alert("error in review adding");
    }
  };

  const { user } = UserState();

  const { id } = useParams();

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/books/getbyid/${id}`
      );
      if (data) {
        setBook(data.data.book);
        setAddCmt("");
      }
    } catch (error) {
      console.log(error);
      window.alert("at book page addcart");
    }
  };

  const getallreview = async () => {
    try {
      const data = await axios.get(`http://127.0.0.1:5000/reviews/all/${id}`);
      if (data) {
        setComments(data.data);
      }
    } catch (error) {
        setComments([]);
      console.log("no comments");
    }
  };

   const handleAddcart = async () => {
    

     try {
       const { data } = await axios.post(`http://127.0.0.1:5000/cart/addCart`, {
         bookId: book.book_id,
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


  const handleDeleteComment=async()=>{
    try{
    const { data } = await axios.delete(
      `http://127.0.0.1:5000/reviews/deletebyid/${user.user_id}/${book.book_id}`
    );
      if (data) {
        window.alert("comment deleted successfully");
        setload(!load);
      }
    } catch (error) {
      window.alert("error in review adding");
    }
  }

  useEffect(() => {
    if (id) {
      fetchBook();
      getallreview();
    }
  }, [load]);

  

  return (
    <>
      <NavBar />
      <section
        class="featured"
        id="featured"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {book && (
          <div class="swiper-slide box">
            <div class="image">
              <p>
                {" "}
                <img src={book.url} alt="" style={{ height: "500px" }} />{" "}
              </p>
            </div>
            <div class="content">
              <h1>{book.author}</h1>
              <p style={{fontSize:"15px"}}>about:{book.about}</p>
              <div class="price" style={{ fontSize: "20px" }}>
                Price:<span>{book.amount}</span>
              </div>
              <button
               
                class="btn"
                style={{ fontSize: "10px", width: "150px" }}
                onClick={handleAddcart}
              >
                add to cart
              </button>
            </div>
          </div>
        )}
      </section>
      <section
        className="reviews"
        style={{
          height: "80vh",
          width: "70vw",
          backgroundColor: "#8080804f",
          borderRadius: "5px",
          margin: "auto",
        }}
      >
        <div style={{ overflowY: "scroll", height: "90%", width: "100%" }}>
          {comments && comments.length !== 0 ? (
            comments.map((el) => (
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                <div
                  class="swiper-slide box"
                  key={el.review_id}
                  style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "80%",
                    marginBottom: "10px",
                  }}
                >
                  <h3>{el.username} </h3>
                  <p>{el.review}</p>
                </div>
                {user.user_id===el.userId?<i class="fa-solid fa-trash" style={{fontSize:"25px",cursor:"pointer"}} onClick={handleDeleteComment}></i>:<i></i>}
              </div>
            ))
          ) : (
            <div>no review </div>
          )}
        </div>
        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <input
            type="text"
            placeholder="enter the comment here"
            value={addCmt}
            onChange={(e) => setAddCmt(e.target.value)}
            style={{
              width: "80%",
              border: "1px solid",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          />
          <button
            style={{
              width: "80px",
              height: "40px",
              fontSize: "15px",
              borderRadius: "10px",
              backgroundColor: "green",
            }}
            onClick={handlerAddcmt}
          >
            add
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BooksShowPage;
