import "./app.scss"
import React from 'react'
import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import Home from "./pages/home/Home"
import UserList from './pages/userList/UserList'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import User from "./pages/user/User"
import NewUser from "./pages/newUser/NewUser"
import ProductList from "./pages/productList/ProductList"
import Product from "./pages/product/Product"
import NewProduct from "./pages/newProduct/NewProduct"
import Login from "./pages/login/Login"
import { AuthContext } from './context/authContext/AuthContext'
import { useContext } from 'react'
import OrderList from "./pages/orderList/OrderList"

const App = () => {

    const { user } = useContext(AuthContext)
 
    return (
        <Router>
            <Switch>
                <React.Fragment>
                <Route exact path="/">
                    {user ? <Home /> : <Redirect to="/login" />}
                </Route>

                {!user ? <Login /> : (
                    <div className="App">
                        <Navbar/>
                        <div className="container">
                            <Sidebar/>
                                <Route exact path="/">
                                    <Home/>
                                </Route>
                                <Route path="/users">
                                    <UserList/>
                                </Route>
                                <Route path="/user/:userId">
                                    <User/>
                                </Route>
                                <Route path="/newUser">
                                    <NewUser/>
                                </Route>
                                <Route path="/products">
                                    <ProductList/>
                                </Route>
                                <Route path="/product/:productId">
                                    <Product/>
                                </Route>
                                <Route path="/newProduct">
                                    <NewProduct/>
                                </Route>
                                <Route path="/orders">
                                    <OrderList/>
                                </Route>
                        </div>
                    </div>
                )}
                </React.Fragment>
            </Switch>
        </Router>
    )
}

export default App

