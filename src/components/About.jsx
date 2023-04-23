import React from 'react'
import './about.css'
import Header from './Header'
import Footer from './Footer'

const About = () => {
    return (
        <><Header />
            <div class="about">
                <h1 class='rule-head'>About the game</h1>
                <p>This is a puzzle game where you have to guess the number I have chosen,you will be given 10 chances and you have to find the number and it has set of rules and hints which you can take help to win the game and you can see your profile details in the profile section.Click on the database to see the database section it contains the details of all the users who have registered in this website.</p>
            </div>
            <div class='parent'>
                <div class='child red'>
                    <h1 class='rule-head'>You will lose if:</h1>
                    <tr>→the value is less than 100</tr>
                    <tr>→the value is greater than 1000</tr>
                    <tr>→number of guess are more than 10</tr>
                    <tr>→If the guess number is empty(or null)</tr>
                </div>
                <div class='child green'>
                    <h1 class='rule-head'>You will get these hints</h1>
                    <tr>→<a href="">whether the answer is even/odd</a></tr>
                    <tr>→<a href="">whether the answer is perfect square number</a></tr>
                    <tr>→<a href="">whether the answer is perfect cube number</a></tr>
                    <tr>→<a href="">whether the answer is patrndrome number</a></tr>
                    <tr>→<a href="">whether the answer is amstrong number</a></tr>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default About;
