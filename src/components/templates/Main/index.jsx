import React from "react";

const MainBody = (props) => {
  return (
    <div className="main">
      <div className="main-navbar">
        <h1>RESTU DWI CAHYO GANTENG</h1>
      </div>
      <div className="main-sidebar"></div>
      <div className="main-body">
        {props.children}
      </div>
    </div>
  );
};

export default MainBody;
