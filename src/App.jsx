
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "./context/AuthContext";
import Box from "./pages/Box";
import Profile from "./pages/Profile";
import Rules from "./components/About";


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Box/>
              </ProtectedRoute>
            }
          />
          <Route path="profile" element={<Profile/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="rules" element={<Rules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
