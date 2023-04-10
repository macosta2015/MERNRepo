import React from 'react'
import "./login.css"
import { useContext } from 'react';
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { user, loading, error, dispatch } = useContext(AuthContext);
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_START", payload: res.data })
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }

    return (
        <div className='login'>
            <div className="LContainer">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput" />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput" />
                <button onClick={handleClick} className="lButton">login</button>
                {error && <span>{error.message}</span>}
            </div>
            Login
        </div>
    )
}

export default Login