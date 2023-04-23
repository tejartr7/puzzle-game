import './navbar.css'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Profile from '../pages/Profile';
import { useNavigate } from 'react-router-dom';
import "../styles.css"
import { x } from '../context/AuthContext'

function Header() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function check() {
    if (currentUser.email === "tejartr123@gmail.com") {
      navigate("https://yourdatabaseurl.com");
    } else {
      alert("You do not have access to this feature.");
    }
  }
  return (
    <><div class="topnav">
      <div class="login-container">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button onClick={() => (navigate("/"))} id="my_btn" type="button" class="btn btn-secondary header-button">Home</button>
          <button onClick={() => (navigate("/Rules"))} id="my_btn" type="button" class="btn btn-secondary header-button">About</button>
          <button onClick={() => (navigate("/Profile"))} id="my_btn" type="button" class="btn btn-secondary header-button">Profile</button>
          <button onClick={() => { signOut(auth); navigate("/login"); }} id="my_btn" type="button" class="btn btn-secondary header-button">Logout</button>

          <button id="my_btn" onClick={check} type="button" class="btn btn-secondary header-button">DataBase</button>

        </div>
      </div>

    </div><marquee Scrollamount="6" behavior="scroll" direction="left"
      onmouseover="this.stop();"
      onmouseout="this.start();" >To know About the website and rules of the website click About</marquee></>
  )
};
export default Header;