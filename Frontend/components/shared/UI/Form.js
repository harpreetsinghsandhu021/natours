import React, { useState, useContext, useRef } from "react";
import classes from "./Form.module.css";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";

const Form = (props) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showscsModal, setShowScsModal] = useState(false);
  const [error, setError] = useState();
  const [file, setFile] = useState();

  const authCtx = useContext(AuthContext);
  const isEmail = (val) => val.includes("@");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    resetHandler: emailResetHandler,
  } = useForm(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputHandler: passwordInputHandler,
    blurHandler: passwordBlurHandler,
    resetHandler: passwordResetHandler,
  } = useForm(isEmail);
  const {
    value: passwordConfirmValue,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmHasError,
    inputHandler: passwordConfirmInputHandler,
    blurHandler: passwordConfirmBlurHandler,
    resetHandler: passwordConfirmResetHandler,
  } = useForm(isEmail);
  const {
    value: UsernameValue,
    isValid: UsernameIsValid,
    hasError: UsernameHasError,
    inputHandler: UsernameInputHandler,
    blurHandler: UsernameBlurHandler,
    resetHandler: UsernameResetHandler,
  } = useForm(isEmail);

  async function submitHandler(e) {
    e.preventDefault();
    let res;

    try {
      if (props.login) {
        const sendRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
            }),
          }
        );

        res = await sendRequest.json();
      } else {
        const formData = new FormData();

        formData.append("email", emailValue);
        formData.append("password", passwordValue);
        formData.append("name", UsernameValue);
        formData.append("passwordConfirm", passwordConfirmValue);
        formData.append("photo", file);

        const sendRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
          {
            method: "POST",
            body: formData,
          }
        );

        res = await sendRequest.json();
      }

      if (res.status === "success") {
        setShowScsModal(true);
        authCtx.login(res.token, res.user._id);

        setTimeout(() => {
          window.location.href = "/";
        }, 80);
      }

      if (res.error.status === "fail" || res.error.status === "error") {
        setShowErrorModal(true);
        setError(res.message);
      }
    } catch (error) {}
  }

  function recieveFile(file) {
    setFile(file);
  }

  function cancelHandler() {
    setShowErrorModal(false);
    setShowScsModal(false);
  }
  return (
    <>
      {showErrorModal && (
        <Modal onCancel={cancelHandler} asOverlay error message={error} />
      )}
      {showscsModal && (
        <Modal method="login" onCancel={cancelHandler} asOverlay />
      )}
      <div className={classes.form_wrapper}>
        <h4>{props.signup ? "sign up" : "Login"}</h4>
        <span>
          hey, enter your credentials to{" "}
          {props.signup ? "sign up for new account" : "login to your account"}
        </span>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.input__name}>
            <input
              className={classes.email}
              autoComplete="off"
              id="email"
              value={emailValue}
              onInput={emailInputHandler}
              onBlur={emailBlurHandler}
              type="text"
              required
            />
            <label className={classes.label_email}>
              <span className={classes.lbl_em_span}>Email</span>
              <div className={classes.line}></div>
            </label>
          </div>

          {props.signup && (
            <div className={classes.input__name}>
              <input
                className={classes.email}
                autoComplete="off"
                value={UsernameValue}
                onBlur={UsernameBlurHandler}
                onInput={UsernameInputHandler}
                id="username"
                type="text"
                required
              />
              <label className={classes.label_email}>
                <span className={classes.lbl_em_span}>UserName</span>
                <div className={classes.line}></div>
              </label>
            </div>
          )}
          {props.signup && <ImageUpload sendFile={recieveFile} />}
          <div className={classes.input__pass}>
            <input
              autoComplete="off"
              id="password"
              value={passwordValue}
              onInput={passwordInputHandler}
              onBlur={passwordBlurHandler}
              type="password"
              required
            />
            <label className={classes.label_pass}>
              <span className={classes.lbl_pass_span}>Password</span>
            </label>
          </div>
          {props.signup && (
            <div className={classes.input__pass}>
              <input
                autoComplete="off"
                id="passwordConfirm"
                value={passwordConfirmValue}
                onInput={passwordConfirmInputHandler}
                onBlur={passwordConfirmBlurHandler}
                type="password"
                required
              />
              <label className={classes.label_pass}>
                <span className={classes.lbl_pass_span}>Confirm Password</span>
              </label>
            </div>
          )}
          <button className={classes.btn__cta}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Form;
