import React, { useState } from "react";

const BoxInfo = (props) => {
  const { color } = props;
  const [isShow, setIsShow] = useState(true);
  const className = ["box-info"];

  switch (color) {
  case "red":
    className.push("red");
    break;
  case "yellow":
    className.push("yellow");
    break;
  case "green":
    className.push("green");
    break;
  }

  if (props.className) className.push(props.className);

  return (
    isShow &&
    <div className={className.join(" ")}>
      <div className="box-info-header">
        <div className="box-info-title">{props.title}</div>
        <div className="box-info-close" onClick={() => { setIsShow(false); }}>x</div>
      </div>
      <div className="box-info-body">
        {props.children}
      </div>
    </div>
  );
};

export default BoxInfo;
