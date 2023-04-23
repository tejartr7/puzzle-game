import React from 'react'
import '../styles.css'
import { useState, useEffect } from 'react';
import Navbar from '../components/Header';
import { x } from '../context/AuthContext'
import { ref, set, get, TableDataGet, child } from "firebase/database";
import { auth, db } from '../firebase'
import Footer from '../components/Footer';

var answer = Math.floor(Math.random() * 900) + 100;
var no_of_guesses = 0;
let rtr = 0;
function Box() {

    const [content, setContent] = useState("No hints are been used");
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

    function restart() {
        set(ref(db, "users/" + k[0]), {
            username: myData.username,
            email: myData.email,
            g: Number(myData.g) + 1,
            w: Number(myData.w),
        });
        no_of_guesses = 0;
        rtr = 0;
        window.location.reload(true);
    }
    function won() {
        set(ref(db, "users/" + k[0]), {
            username: myData.username,
            email: myData.email,
            g: Number(myData.g) + 1,
            w: Number(myData.w) + 1,
        });
        no_of_guesses = 0;
        rtr = 0;
        window.location.reload(true);
    }

    useEffect(() => {
        let temp = 'users/' + m;
        const usersRef = ref(db, temp);
        async function fetchData() {
            try {
                const snapshot = await get(ref(db, temp));
                if (snapshot.exists()) {
                    setMyData(snapshot.val());
                    localStorage.setItem('myData', JSON.stringify(myData));
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [m]);
    useEffect(() => {
        const storedGuesses = localStorage.getItem('no_of_guesses');
        if (storedGuesses !== null) {
            no_of_guesses = parseInt(storedGuesses);
            rtr = no_of_guesses - 1;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('no_of_guesses', no_of_guesses);
    }, [no_of_guesses]);




    const play = async (e) => {
        e.preventDefault();
        var user_guess = e.target[0].value;
        let temp = "Number of guesss=";
        let x = "chosen number is ";
        let l = "";
        if (user_guess < 100 || user_guess > 1000) {
            alert("you lost the game");
        }
        else {
            rtr = no_of_guesses;
            var dummy = "";
            if (no_of_guesses === 10) {
                let str = "Limit exceeded game over";
                document.getElementById("message1").innerHTML = str;
                document.getElementById("my_btn").disabled = true;
                alert("you lost the game");
                restart();
            }
            else if (user_guess < answer) {
                l = "too low";
                document.getElementById("message2").innerHTML = "chosen number is low";
            }
            else if (user_guess > answer) {
                l = "too high";
                document.getElementById("message2").innerHTML = "chosen number is high";
            }
            else if (user_guess == answer) {
                l = "the answer";
                alert("you have won the game");
                won();
            }
            temp += rtr;
            x += l;
            document.getElementById("message1").innerHTML = temp;
            document.getElementById("message2").innerHTML = x;
            console.log(l);
            no_of_guesses += 1;
        }
    }

    const hint = () => {
        let x = 0;
        let sum = 0;
        x = Number(String(answer).split('').reverse().join(''));
        let k = Math.sqrt(answer);
        let p = Math.cbrt(answer);
        var h = "";
        let temp = answer;
        while (temp > 0) {
            let remainder = temp % 10;
            sum += remainder * remainder * remainder;
            temp = parseInt(temp / 10);
        }
        if (sum === answer) {
            h += "The number is a amstrong number ";
        }
        if (x === answer) {
            h += " The number is a palidrome number ";
        }
        if (k * k === answer && answer / k === k) {
            h += "The number is a perfect square number ";
        }
        if (k * k * k === answer) {
            h += "The number is a perfect cube number number ";
        }
        if (answer % 2 === 1) {
            h += "The number is a odd number "
        }
        if (answer % 2 === 0) {
            h += "The number is a even number "
        }
        document.getElementById("message3").innerHTML = h;
    }
    return (
        <><Navbar /><div className='box-main '>
            <div class="container-main">
                <h4>I am thinking of a number between 100-1000.</h4>
                <h4>Can you guess it?</h4>
                <h4>Maximum number of chances=10</h4>
                <form onSubmit={play}>
                    <input type="text" placeholder="Num" id="guess" />
                    <br />
                    <button id="my_btn" className='btn btn-secondary guess-button'>GUESS</button>
                </form>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button onClick={hint} id="my_btn" type="button" class="btn btn-secondary guess-button">Hints</button>
                    <button onClick={restart} type="button" class="btn btn-secondary guess-button">Restart</button>
                </div>
                <h4 id="message1">No. Of Guesses:{rtr}</h4>
                <h4 id="message2"></h4>
                <h4 id="message3"></h4>
            </div>
            <Footer />
        </div></>
    );
}

export default Box