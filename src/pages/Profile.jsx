import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase';
import 'firebase/database';
import { x } from '../context/AuthContext'
import { ref, set, get, TableDataGet, child } from "firebase/database";
import '../pages.scss'
import Header from '../components/Header';
import Footer from '../components/Footer';


const Profile = () => {
    let k = x.email.split(".");
    let m = k[0];
    const [myData, setMyData] = useState(() => {
        const dataFromStorage = window.localStorage.getItem(m);
        return dataFromStorage ? JSON.parse(dataFromStorage) : {
            mail: "",
            username: "",
            g: 0,
            w: 0,
        };
    });

    useEffect(() => {
        let temp = "users/" + m;
        const usersRef = ref(db, temp);
        async function fetchData() {
            try {
                const snapshot = await get(ref(db, temp));
                if (snapshot.exists()) {
                    setMyData(snapshot.val());
                    console.log(myData)
                    localStorage.setItem('myData', JSON.stringify(myData));
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [m]);

    return (<><Header /><div className='formContainer'>
        <div className='formWrapper'>
            <span class="logo">Rtr's Puzzle Game</span>
            <br />
            <h5>UserName: {myData.username}</h5>
            <br />
            <h5>UserMail: {k[0]}</h5>
            <br />
            <h5>Number of Games: {myData.g}</h5>
            <br />
            <h5>Number of Winners: {myData.w}</h5>
            <br />
        </div>
        <Footer />
    </div></>
    )
}

export default Profile;
