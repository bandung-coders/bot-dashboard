import React, { useState } from "react";

const Modal = (props) => {
  const [hide, setHide] = useState(false);
  const className = ["modal-box"];

  switch (props.size) {
  case "xs":
    className.push("modal-box-xs");
    break;
  case "sm":
    className.push("modal-box-sm");
    break;
  case "md":
    className.push("modal-box-md");
    break;
  case "lg":
    className.push("modal-box-lg");
    break;
  case "xl":
    className.push("modal-box-xl");
    break;
  }

  switch (props.radius) {
  case "xs":
    className.push("modal-box-radius-xs");
    break;
  case "sm":
    className.push("modal-box-radius-sm");
    break;
  case "md":
    className.push("modal-box-radius-md");
    break;
  case "lg":
    className.push("modal-box-radius-lg");
    break;
  case "xl":
    className.push("modal-box-radius-xl");
    break;
  }

  className.push(props.className);

  const onClose = () => {
    if (props.onClose) props.onClose();
  };

  return (
    props.show &&
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-background" onClick={onClose}></div>
          <div className={className.join(" ")}>
            <button type="button" className="modal-btn-close" onClick={onClose}>
              <i className="resitdc icon-x"></i>
            </button>
            {props.children}
          </div>
        </div>
      </div>
  );
};

export default Modal;
