import React from "react";
import classes from "./Modal.module.css";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Modal = (props) => {
  if (props.error) {
    return (
      <>
        {props.asOverlay && (
          <div
            onClick={() => props.onCancel()}
            className={classes.overlay}
          ></div>
        )}
        <div className={classes.modal}>
          <GiCrossMark className={classes.err_svg} />
          <div className={classes.modal__cnt}>
            <h4>{props.method} Error Detected</h4>
            <p> {props.message}</p>
          </div>
          {/* <ImCross
            onClick={() => props.onCancel()}
            className={classes.cncl__btn}
          /> */}
        </div>
      </>
    );
  }

  return (
    <>
      {props.asOverlay && (
        <div onClick={() => props.onCancel()} className={classes.overlay}></div>
      )}
      <div className={classes.modal}>
        <TiTick fill="#57d6bf" className={classes.scs_svg} />
        <div className={classes.modal__cnt}>
          <h4>{props.method} successful. Redirecting...</h4>
        </div>
        <ImCross
          onClick={() => props.onCancel()}
          className={classes.cncl__btn}
        />
      </div>
    </>
  );
};

export default Modal;
