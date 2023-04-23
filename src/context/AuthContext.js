import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


const localStorageKey = "myAppUser";
export const AuthContext = createContext({ currentUser: null });
const x = {
  name: "",
  email: "",
  g: 0,
  w: 0,
};
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem(localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          name: user.username,
          g: user.g,
          w: user.w,
        };
        x.email = user.email;
        x.name = user.username;
        x.g = user.g;
        x.w = user.w;
        setCurrentUser(userData);
        localStorage.setItem(localStorageKey, JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        localStorage.removeItem(localStorageKey);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { x };
