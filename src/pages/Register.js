import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import '../pages.scss'
import { onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Register = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    name: "",
    mail: "",
    g: 0,
    w: 0,
  })
  const navigate = useNavigate();

  function writeUserData(userId, name, email) {
    var x = email.split(".");
    set(ref(db, "users/" + x[0]), {
      username: name,
      email: email,
      g: Number(0),
      w: Number(0),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const name = displayName;
    const mail = email;
    const g = 0;
    const w = 0;
    const x = email.split("."); // replace with your desired key
    const key = x[0];
    var dummy = "https://imgettingmad-39265-default-rtdb.firebaseio.com/";
    dummy += key;
    dummy += ".json";
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      writeUserData(res.user.uid, displayName, mail);
    } catch (err) {
      setErr(true);
    }
    if (!err) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) navigate("/login");
      });
    }
  };

  return (
    <div class='formContainer'>
      <div class='formWrapper'>
        <span class="logo">Rtr's Puzzle Game</span>
        <span class="title">Register</span>
        <form onSubmit={handleSubmit} >
          <input type='text' placeholder='Username' />
          <input type='email' placeholder='emailId' />
          <input type='password' placeholder='enter your password' />
          <button disabled={loading}>Sign up</button>
          {err && <p>There is some error try again later</p>}
        </form>
        <p>
          You do have an account? <a href="/login" className='login-link'>Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register