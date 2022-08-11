import React, { useState, useEffect } from "react";

const InputFileTeamImage = (props) => {
  const { src } = props;
  const [base64, setBase64] = useState("");

  useEffect(() => {
    if (src) {
      setBase64(src);
    }
  }, []);

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    const binaryString = readerEvt.target.result;
    const base64Convert = window.btoa(binaryString, "base64");
    setBase64(`data:image/png;base64,${base64Convert}`);
    if (props.onChange) props.onChange(base64Convert);
  };

  return (
    <>
      <div className={"input-image-wrapper"}>
        {
          <input
            type="file"
            className="input-image-file"
            accept="image/jpg, image/jpeg"
            onChange={onChangeHandler}
          />
        }
        {
          base64
            ? <div className="input-image-preview" style={{ backgroundImage: `url(${base64})` }}></div>
            : <div className="input-image-box" label={props.label}></div>
        }
      </div>
    </>
  );
};

export default InputFileTeamImage;
