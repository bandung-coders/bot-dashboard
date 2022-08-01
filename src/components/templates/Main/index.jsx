import React from "react";

const MainBody = (props) => {
  return (
    <div className="main">
      <div className="main-navbar">
        <h1>RESTU DWI CAHYO GANTENG</h1>
      </div>
      {props.children}
    </div>
  );
};

export default MainBody;
