import React, { useState, useEffect } from "react";
import { auth } from "../../services/Firebase";

const LoginContext = React.createContext();

function LoginProvider({ children }) {
  const [login, setLogin] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLogin(user);
      setIsLoading(false);
    });
  }, [login]);

  return (
    <LoginContext.Provider value={login}>
      {!loading && children}
    </LoginContext.Provider>
  );
}

export { LoginProvider, LoginContext };
