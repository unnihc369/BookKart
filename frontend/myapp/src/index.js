import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

  const PUBLIC_KEY =
    "pk_test_51O0pHzSA6IUOypCMpV6P4L0MFf9nTQh7TTE2uttQRqn8kz53VVl4lEjPfdOxUDHn2RDCrfjWvCj4xCu5nNjuO7oK00J2rATcm8";

  const stripeTestPromise = loadStripe(PUBLIC_KEY);



root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Elements stripe={stripeTestPromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
