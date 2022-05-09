import React from 'react'
import { useState, useContext } from 'react'
import { login } from "../../context/authContext/apiCalls"
import { AuthContext } from "../../context/authContext/AuthContext"
import './login.scss'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassWord ] = useState('')
    const { isFetching, dispatch } = useContext(AuthContext) 

    const handleLogin = (e) => {
        e.preventDefault()
        login({ email, password }, dispatch)
    }

    return (
        <div className="login">
            <h1>ADMIN</h1>
            <form action="" className="loginForm">
                <input 
                    type="text" 
                    name="email" 
                    className="loginInput" 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password" 
                    className="loginInput"
                    placeholder="Password"
                    onChange={(e) => setPassWord(e.target.value)}
                />
                <button 
                    className="loginButton" 
                    onClick={handleLogin}
                    disabled={isFetching}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
