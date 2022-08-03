import React from "react";

const MainBody = (props) => {
  return (
    <div className="main">
      {props.children}
    </div>
  );
};

export default MainBody;
