import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { UserState } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const AddBookPage = () => {

    // "user_name":"pavan",
    // "email":"pavanha2003@gmail.com",
    // "phone":"7892626547",
    // "bookname":"The Cloud king",
    // "author":"pavan",
    // "amount":100,
    // "tag":"general",
    // "about":"it tell about cloud",
    // "url":"https://imgv2-2-f.scribdassets.com/img/word_document/317276308/original/adfe3e30f6/1585165423?v=1"
    // const [username,setUserName]=useState();
    // const [email,setEmail]=useState();
    // const [phone,setPhone]=useState();


   const {user}=UserState();
   console.log(user);

    const [bookname,setBookname]=useState();
    const [author,setAuthor]=useState();
    const [amount,setAmount]=useState();
    const [tag,setTag]=useState();
    const [about,setAbout]=useState();
    const [url,setUrl]=useState();

    const navigate=useNavigate();
    const handlsubmit=async(e)=>{
      e.preventDefault();
      if(!user ||!bookname ||!author ||!amount ||!tag ||!about ||!url){
        window.alert("please provide all infomation");
        return;
      }


       try {
      const data = await axios.post(`http://127.0.0.1:5000/addbook/add`, {
        user_name: user.name,
        email: user.email,
        phone: user.phone,
        bookname:bookname,
        author: author,
        amount:amount,
        tag: tag,
        about: about,
        url:url.imageUrl,
        status:"fail",
      });
      if (data) {
         window.alert("user book publication request sent");
         navigate('/');
      }
    } catch (error) {
      console.log(error);
      window.alert("error in publishing");
    }

    }


      const onChangeFIleUploadHandler = (File) => {
        if (File === null) return;

        if (File === undefined)
          return window.alert("plese select proper image!");

        const blogRef = ref(storage, `Blog/${File.name + v4()}`);
        const uploadTask = uploadBytesResumable(blogRef, File);
       
        uploadTask.on(
          "state_changed",
          (snapshot) => {
           
            const progres =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            

            switch (snapshot.state) {
              case "paused":
                window.alert("upload paused");
                break;
              case "running":
                // ToastInfo("Running");
                console.log("running");
                break;
              default:
                break;
            }
          },
          (ere) => {
            window.alert(ere.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              window.alert("Image upload successfull");
             
              setUrl((prev) => ({ ...prev, imageUrl: downloadUrl }));
              
            });
          }
        );
      };


 

  return (
    <>
      {/* <NavBar /> */}
      <div className="login-form-container active">
        {/* <NavBar/> */}
        <form action="">
          <h3>Publish User Books</h3>

          <span>Book Name</span>
          <input
            type="text"
            className="box"
            placeholder="Enter your Book Name"
            value={bookname}
            onChange={(e) => {
              setBookname(e.target.value);
            }}
          />

          <span>author</span>
          <input
            type="text"
            className="box"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />

          <span>amount</span>
          <input
            type="text"
            className="box"
            placeholder="Enter Book amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <div>
            <span>tag</span>
            <select
              className="box"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            >
              <option value="">Select a tag</option>
              <option value="technical">Technical</option>
              <option value="general">General</option>
              <option value="story">Story</option>
              <option value="novels">Novels</option>
              <option value="social">Social</option>
            </select>
          </div>

          <span>about</span>
          <input
            type="text"
            className="box"
            placeholder="describe about this book"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <span>Choose book image</span>
          <input
            type="file"
            className="box" // Applying className "box"
            placeholder="Enter file type (e.g., pdf, image, video)"
            onChange={(e) => {
              // setFile();
              onChangeFIleUploadHandler(
                e.target.files[e.target.files.length - 1]
              )
            }
        }
          />

          <button className="btn" onClick={handlsubmit}>
            submit
          </button>
        </form>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default AddBookPage