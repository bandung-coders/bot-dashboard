import React from "react";
import { Sidebar } from "components/templates";

const MainBody = (props) => {
  return (
    <>
      <div className="main-navbar">
        <h1>RESTU DWI CAHYO GANTENG</h1>
      </div>
      <Sidebar />
      <div className="main-body">
        {props.children}
      </div>
    </>
  );
};

export default MainBody;
