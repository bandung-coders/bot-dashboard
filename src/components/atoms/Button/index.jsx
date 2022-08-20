import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  let navigate;
  const {
    type,
    disabled,
    color,
    radius,
    loading,
    xs,
    sm,
    md,
    lg,
    xl,
    full,
    href,
    title,
    tooltipMessage,
    heightFull,
  } = props;

  if (href) {
    navigate = useNavigate();
  }

  const className = ["btn"];

  // #region - BUTTON COLOR
  switch (color) {
  case "black":
    className.push("btn-black");
    break;
  case "red":
    className.push("btn-red");
    break;
  case "primary":
    className.push("btn-primary");
    break;
  case "white":
    className.push("btn-white");
    break;
  case "green":
    className.push("btn-green");
    break;
  case "blue":
    className.push("btn-blue");
    break;
  case "gray":
    className.push("btn-gray");
    break;
  }
  // #endregion - BUTTON COLOR

  // #region - BUTTON RADIUS
  switch (radius) {
  case "xs":
    className.push("radius-xs");
    break;
  case "sm":
    className.push("radius-sm");
    break;
  case "md":
    className.push("radius-md");
    break;
  case "lg":
    className.push("radius-lg");
    break;
  case "xl":
    className.push("radius-xl");
    break;
  }
  // #endregion - BUTTON RADIUS

  // #region - BUTTON SIZE
  if (xs) {
    className.push("btn-size-xs");
  } else if (sm) {
    className.push("btn-size-sm");
  } else if (md) {
    className.push("btn-size-md");
  } else if (lg) {
    className.push("btn-size-lg");
  } else if (xl) {
    className.push("btn-size-xl");
  }
  // #endregion - BUTTON SIZE

  if (full) className.push("width-full");
  if (heightFull) className.push("height-full");
  if (tooltipMessage) className.push("btn-tooltip");
  if (props.className) className.push(props.className);
  if (loading) className.push("btn-loading");

  const onClickHandler = (e) => {
    if (href) {
      navigate(href);
    } else {
      if (props.onClick) props.onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={className.join(" ")}
      onClick={onClickHandler}
      disabled={disabled || loading}
      tooltip-message={tooltipMessage}
      title={title}
    >
      { !loading && props.children}
    </button>
  );
};

export default Button;
