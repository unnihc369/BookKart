import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {  headers } from "../utility/errorUtility";
const UserContext = createContext();

export const UserState = () => useContext(UserContext);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);
  const [allbooks, SetAllbooks] = useState([]);
  const [load, setLoad] = useState(false);
  const [books,Setbooks]=useState([]);
 

  const handleBooks = async () => {
    try {
      const {data} = await axios.get(
        "http://127.0.0.1:5000/books/all",
        {
          headers:headers
        }
      );
      
      if(data){
        // console.log(data.data)
        SetAllbooks(data.data.books);
        Setbooks(data.data.books);
      }
    } catch (error) {
      console.log(error);
    }
  };



 
  console.log(allbooks);

 const handlerSearch=(search)=>{
console.log(search);
  if(!search){
    SetAllbooks(books);
    return;
  }

  const data = books.filter(
    (book) =>
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.tag.toLowerCase().includes(search.toLowerCase())
  );
  SetAllbooks(data);
 }





  useEffect(() => {
    if(localStorage.getItem('user')){
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user)
    }
    handleBooks();
  }, [load]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        order,
        setOrder,
        allbooks,
        SetAllbooks,
        load,
        setLoad,
        handlerSearch,
       
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
