import React, { useEffect, useRef } from "react";
import Styles from "./User.module.css";

import { useNavigate } from "react-router";

import { LoginContext } from "../../provider/LoginProvider";
import { LogOut, Verify, DeleteAccount } from "../../services/Firebase";

function User() {
  const user = React.useContext(LoginContext);
  const navigate = useNavigate();
  const messageRef = useRef(null);

  useEffect(() => {
    !user && navigate("/login");
  }, [user]);

  const handleMessage = (isError, message) => {
    if (messageRef.current !== null) {
      messageRef.current.className = `${Styles.userMessage} ${
        isError && Styles.error
      } ${Styles.show}`;
      messageRef.current.innerText = message;
      setTimeout(() => {
        messageRef.current !== null &&
          (messageRef.current.className = `${Styles.userMessage} ${
            isError && Styles.error
          } ${Styles.hide}`);
      }, 3000);
    }
  };

  return (
    <div className={Styles.userMain}>
      <h1>Welcome</h1>
      <div className={Styles.userBox}>
        <div>Name: {user && user.displayName}</div>
        {user && user.phoneNumber && (
          <div>Phone number: {user && user.phoneNumber}</div>
        )}
        <div>Email: {user && user.email}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Account verification: {user && user.emailVerified ? "Yes" : "No"}
          {user && !user.emailVerified && (
            <button
              className={Styles.userButton}
              onClick={() =>
                Verify().then((result) => {
                  switch (result) {
                    case "OK":
                      handleMessage(false, "Verification mail sent.");
                      break;

                    case "auth/too-many-requests":
                      handleMessage(
                        true,
                        "Too many requests sent, try again later."
                      );
                      break;

                    default:
                      handleMessage(true, "An unknown error occurred!");
                  }
                })
              }
            >
              Verify
            </button>
          )}
        </div>
        <br />
        <div>Account creation date: {user && user.metadata.creationTime}</div>
        <div>Last login date: {user && user.metadata.lastSignInTime}</div>
        <br />
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            className={Styles.userButton}
            onClick={() =>
              LogOut().then((result) => {
                result === "OK" ? navigate("/login") : handleMessage(result);
              })
            }
          >
            Logout
          </button>
          <button
            className={Styles.userButton}
            onClick={() =>
              window.confirm("Are you sure?") &&
              DeleteAccount().then((result) => {
                result === "OK" ? navigate("/login") : handleMessage(result);
              })
            }
          >
            Delete Account
          </button>
        </div>
      </div>
      <div className={Styles.userMessage} ref={messageRef}>
        Error!
      </div>
    </div>
  );
}

export default User;
