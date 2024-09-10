import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import NavBar from "../components/NavBar";
import { Button } from "@chakra-ui/react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserContext";

const PaymentPage = () => {
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000000",
        fontWeight: 500,
        fontSize: "18px",

        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fc883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  const [success, setSuccess] = useState(false);
  const [paymenturl, setPaymentUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const amount = JSON.parse(sessionStorage.getItem("amount"));

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const { user } = UserState();

  const sendMail = async (el) => {
    if (!el) {
      //  window.alert("please provide the all deti")
      return;
    }
    try {
      const data = await axios.post(`http://127.0.0.1:5000/send-email/`, {
        to: el.to,
        subject: el.subject,
        body: el.body,
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

  const handleOrders = async () => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    console.log(amount, user, paymenturl, cart);

    if (!amount || !user || !paymenturl || !cart) {
      window.alert("please provide the total amount");
      return;
    }

    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/orders/add`, {
        userId: user.user_id,
        bookName: cart[0].name,
        amount: amount,
        paymenturl: paymenturl,
      });
      if (data) {
        window.alert("ordered successfully");
        const bookname = cart.map((el) => {
          return el.name;
        });
        sendMail({
          to: user.email,
          subject: "order confirmed ",
          body: `Hii ${user.name}... \nwe recieved your order \nhere is details of it ..\n booknames:${bookname} \n total amount:${amount}`,
        });
        window.setTimeout(() => {
          navigate("/user");
        }, 2000);
      }
    } catch (error) {
      window.alert("error in cart page");
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await axios.post(
          "https://backend-echo.vercel.app/payment",
          {
            amount: amount,
            id,
          }
        );
        if (
          response.status == 200 &&
          response.data.details.id !== null &&
          response.data.details.id
        ) {
          setSuccess(true);
          window.alert("payment successfull");
          setPaymentUrl(response.data.details.id);
          //   console.log(response.data.details.id);
          handleOrders(response.data.details.id);
          //   navigate('/user');
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
        window.alert("error occuured in payment");
        setIsLoading(false);
      }
    } else {
      window.alert("error in payment");
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div
        className="container1 p-0"
        style={{ width: "60vw", height: "50vh", margin: "auto" }}
      >
        <h1 style={{ fontSize: "30px" }}>Payment Details</h1>

        <div
          className="row gx-3"
          style={{
            width: "100%",
            height: "200px",
            border: "1px solid black",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            <CardElement options={CARD_OPTIONS} />
          </div>

          <div className="col-12">
            <Button
              onClick={handlerSubmit}
              colorScheme="blue"
              cursor={"pointer"}
              backgroundColor={"green"}
              borderRadius={"10px"}
              padding={"10px"}
              isLoading={isLoading}
              textAlign="center"
            >
              Pay - ₹{amount}
            </Button>
          </div>
        </div>
      </div>
      {/* </Elements> */}

      <Footer />
    </>
  );
};

export default PaymentPage;
