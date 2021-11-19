import React, { useState, useEffect } from "react";
import { auth } from "../../services/Firebase";

const LoginContext = React.createContext();

function LoginProvider({ children }) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLogin(user);
    });
  }, [auth, login]);

  return (
    <LoginContext.Provider value={login}>{children}</LoginContext.Provider>
  );
}

export { LoginProvider, LoginContext };
