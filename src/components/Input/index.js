import React, { useRef } from "react";
import Styles from "./Input.module.css";

function Input({ placeHolder, ...props }) {
  const inputRef = useRef(null);

  return (
    <div className={Styles.inputMain}>
      <input
        className={Styles.inputInput}
        {...(props && props)}
        ref={inputRef}
      />
      <label
        className={Styles.inputLabel}
        onClick={() => inputRef.current.focus()}
      >
        {placeHolder}
      </label>
    </div>
  );
}

export default Input;
