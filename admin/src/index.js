import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { ProductContextProvider } from "./context/productContext/ProductContext";
import { OrderContextProvider } from "./context/orderContext/OrderContext";
import { UserContextProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
