import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Input from "../../components/Input";
import Styles from "./Login.module.css";
import { LogIn } from "../../services/Firebase";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginErrorRef = useRef(null);
  const navigate = useNavigate();

  const LoginHandle = () => {
    if (userName.includes("@") && password.length >= 8) {
      LogIn(userName, password).then((result) => {
        switch (result) {
          case "OK":
            navigate("/user");
            break;

          case "auth/user-not-found":
            errorHandler("User not found");
            break;

          default:
            errorHandler("An unknown error!");
            break;
        }
      });
    } else if (!userName.includes("@") && password.length < 8) {
      errorHandler("Incorrect email address, Incorrect password");
    } else if (!userName.includes("@")) {
      errorHandler("Incorrect email address");
    } else {
      errorHandler("Incorrect password");
    }
  };

  const errorHandler = (error) => {
    if (loginErrorRef.current !== null) {
      loginErrorRef.current.className = `${Styles.loginError} ${Styles.show}`;
      loginErrorRef.current.innerText = error;
      setTimeout(() => {
        loginErrorRef.current !== null &&
          (loginErrorRef.current.className = `${Styles.loginError} ${Styles.hide}`);
      }, 3000);
    }
  };

  return (
    <div className={Styles.loginMain}>
      <form
        onSubmit={(event) => event.preventDefault()}
        className={Styles.mainForm}
      >
        <h1>Login</h1>
        <br />
        <Input
          type="email"
          placeHolder="Email"
          autoComplete="off"
          onChange={(event) => setUserName(event.target.value)}
        />
        <Input
          type="password"
          placeHolder="Password"
          autoComplete="off"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={Styles.formSubmit} onClick={LoginHandle}>
          Login
        </button>
      </form>
      <div className={Styles.loginError} ref={loginErrorRef}>
        Error!
      </div>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
