import React, { useEffect } from "react";
import classes from "../UI/Form.module.css";
import { isEmail, isValidName } from "@/utils/validators";
import { useForm, useFormDynamic } from "../hooks/useForm";

const Input = (props) => {
  const {
    value: inputValue,
    isValid: valueIsValid,
    hasError: inputHasError,
    inputHandler: inputHandler,
    blurHandler: blurHandler,
    resetHandler,
  } = useFormDynamic(isValidName, props.value);

  useEffect(() => {
    props.sendValue(inputValue);
  }, [inputValue]);

  return (
    <>
      <div className={classes.input__name}>
        <input
          className={`${classes.email}`}
          autoComplete="off"
          id={props.id}
          value={inputValue}
          onInput={inputHandler}
          onBlur={blurHandler}
          type={props.type}
          required
        />
        <label className={classes.label_email}>
          <span className={classes.lbl_em_span}>{props.label}</span>
          <div className={classes.line}></div>
        </label>
      </div>
    </>
  );
};

export default Input;
