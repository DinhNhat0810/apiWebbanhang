import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { ProductContextProvider } from "./context/productContext/ProductContext";
import { OrderContextProvider } from "./context/orderContext/OrderContext";
import { UserContextProvider } from "./context/userContext/UserContext";
import { BlogContextProvider } from "./context/blogContext/BlogContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <BlogContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
          </BlogContextProvider>
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
