import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Input from "../../components/Input";
import { SignUp } from "../../services/Firebase";
import Styles from "./Signup.module.css";

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const signupErrorRef = useRef(null);
  const navigate = useNavigate();

  const signupHandle = () => {
    if (userName.includes("@") && password.length >= 8) {
      SignUp(userName, password).then((result) => {
        switch (result) {
          case "OK":
            navigate("/user");
            break;

          case "auth/email-already-exists" && "auth/email-already-in-use":
            errorHandler("User exists");
            break;

          case "auth/email-already-in-use":
            errorHandler("User exists");
            break;

          case "auth/internal-error":
            errorHandler("Server error");
            break;

          case "auth/invalid-password":
            errorHandler("Invalid password");
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
    if (signupErrorRef.current !== null) {
      signupErrorRef.current.className = `${Styles.signupError} ${Styles.show}`;
      signupErrorRef.current.innerText = error;
      setTimeout(() => {
        signupErrorRef.current !== null &&
          (signupErrorRef.current.className = `${Styles.signupError} ${Styles.hide}`);
      }, 3000);
    }
  };

  return (
    <div className={Styles.signupMain}>
      <form
        onSubmit={(event) => event.preventDefault()}
        className={Styles.mainForm}
      >
        <h1>Sign up</h1>
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
        <button className={Styles.formSubmit} onClick={signupHandle}>
          Sign up
        </button>
      </form>
      <div className={Styles.signupError} ref={signupErrorRef}>
        Error!
      </div>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
