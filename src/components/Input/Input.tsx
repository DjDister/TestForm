import React, { useState } from "react";
import { Field } from "redux-form";
import styles from "./Input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  className?: string;
  customStyles?: React.CSSProperties;
  inputName: string;
  type?: string;
  inputStatus?: "valid" | "invalid" | "default";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalidInputMessage?: string;
}

export default function Input({
  label,
  className,
  customStyles,
  inputName,
  type,
  value,
  onChange,
  inputStatus,
  invalidInputMessage,
  step,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isInteracted = isFocused || value !== "";

  const border = isFocused
    ? "1px solid blue"
    : inputStatus === "valid"
    ? "1px solid green"
    : inputStatus === "invalid"
    ? "1px solid red"
    : "1px solid grey";

  const resizeLabel = {
    height: "50%",
    fontSize: "0.8rem",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        border: border,
        boxShadow: isFocused ? "0 0px 8px 2px lightblue" : "none",
        ...customStyles,
      }}
    >
      <label
        style={{
          ...(isInteracted ? resizeLabel : {}),
        }}
        className={styles.labelCont}
        htmlFor={inputName}
      >
        {label}
      </label>
      <Field
        style={{
          height: isInteracted ? "50%" : "100%",
          color:
            (type === "time" || "date") && !isInteracted
              ? "transparent"
              : "black",
        }}
        className={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
        component={"input"}
        type={type}
        name={inputName}
        step={step}
      />
      {invalidInputMessage && inputStatus === "invalid" && (
        <div className={styles.invalidInputMessage}>{invalidInputMessage}</div>
      )}
    </div>
  );
}
