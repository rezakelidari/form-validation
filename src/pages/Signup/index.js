import React, { useRef, useState, useEffect } from "react";
import Styles from "./Signup.module.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import Input from "../../components/Input";
import { SignUp } from "../../services/Firebase";
import { LoginContext } from "../../provider/LoginProvider";

function Signup() {
  const user = React.useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const signupErrorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/user");
  }, [user]);

  const signupHandle = () => {
    if (name.length >= 2 && email.includes("@") && password.length >= 8) {
      SignUp(email, password, name).then((result) => {
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
    } else if (name.length < 3 && !email.includes("@") && password.length < 8) {
      errorHandler(
        "Incorrect email address, Incorrect password, Incorrect Name, Incorrect phone number"
      );
    } else if (!email.includes("@")) {
      errorHandler("Incorrect email address");
    } else if (password.length < 8) {
      errorHandler("Incorrect password");
    } else if (name.length < 3) {
      errorHandler("Incorrect name");
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
          type="name"
          placeHolder="Your name"
          autoComplete="off"
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="email"
          placeHolder="Email"
          autoComplete="off"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeHolder="Password"
          autoComplete="off"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
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
