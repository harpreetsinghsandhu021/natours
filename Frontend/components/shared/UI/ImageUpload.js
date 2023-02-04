import React, { useRef, useState, useEffect } from "react";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const fileUplRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  function FilePicker() {
    if (props.update) {
      return props.mountain ? (
        <img
          src={`${
            previewUrl
              ? previewUrl
              : `${process.env.NEXT_PUBLIC_API_URL}/img/tours/${props.image}`
          } `}
        />
      ) : (
        <img
          src={`${
            previewUrl
              ? previewUrl
              : `${process.env.NEXT_PUBLIC_API_URL}/img/tours/${props.image}`
          } `}
        />
      );
    } else {
      return props.mountain ? (
        <img src={`${previewUrl ? previewUrl : "/images/default-m.jpg"} `} />
      ) : (
        <img src={`${previewUrl ? previewUrl : "/images/defa.png"} `} />
      );
    }
  }

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function filePickHandler(e) {
    e.preventDefault();
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];

      setFile(pickedFile);
      props.sendFile(pickedFile);
    }
  }

  return (
    <div className={classes.file__picker}>
      <input
        onChange={filePickHandler}
        ref={fileUplRef}
        style={{ display: "none" }}
        type="file"
      />

      <button
        onClick={() => {
          fileUplRef.current.click();
        }}
      >
        <FilePicker />
      </button>
    </div>
  );
};

export default ImageUpload;
