import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const currUserMail = "";

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    navigate("/");
                    console.log("hello");
                    console.log(currentUser);
                }
            });
        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">RTR's puzzle game</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {err && <p>Something went wrong</p>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
