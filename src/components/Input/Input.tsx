import React, { useCallback, useMemo, useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label?: string;
  className?: string;
  customStyles?: React.CSSProperties;
  input: {
    type?: string;
    name: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    value: string;
  };
  invalidInputMessage?: string;
  selectOptions?: React.ReactNode;
  meta?: {
    touched: boolean;
    error: string;
  };
  customType?: string;
  step?: number | string;
  disableDecimals?: boolean;
}

export default function Input({
  label,
  className,
  customStyles,
  input,
  selectOptions,
  meta,
  customType,
  step,
  disableDecimals,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isInteracted = isFocused || input.value !== "";

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const inputStatus =
    meta?.error && meta.touched
      ? "invalid"
      : !meta?.error
      ? "valid"
      : "default";

  const border = isFocused
    ? "1px solid blue"
    : inputStatus === "valid"
    ? "1px solid green"
    : inputStatus === "invalid"
    ? "1px solid red"
    : "1px solid grey";

  const resizeLabel = useMemo(
    () => ({
      height: "50%",
      fontSize: "0.8rem",
      transition: "all 0.2s ease-in-out",
    }),
    []
  );

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
        htmlFor={input.name}
      >
        {label}
      </label>
      {customType === "select" && selectOptions ? (
        <select
          style={{
            height: isInteracted ? "50%" : "100%",
          }}
          className={styles.input}
          value={input.value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            input.onChange(e)
          }
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          {selectOptions}
        </select>
      ) : (
        <input
          style={{
            height: isInteracted ? "50%" : "100%",
            color:
              (input.type === "time" || "date") && !isInteracted
                ? "transparent"
                : "black",
          }}
          className={styles.input}
          onChange={input.onChange}
          value={input.value}
          step={step}
          name={input.name}
          type={customType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={
            disableDecimals
              ? (e) => {
                  if (e.key === "." || e.key === ",") {
                    e.preventDefault();
                  }
                }
              : undefined
          }
        ></input>
      )}
      {meta?.error && meta.touched && (
        <div className={styles.invalidInputMessage}>{meta?.error}</div>
      )}
    </div>
  );
}
