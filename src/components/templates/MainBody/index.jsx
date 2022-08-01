import React from "react";
import { Sidebar } from "components/templates";

const MainBody = (props) => {
  return (
    <>
      <Sidebar />
      <div className="main-body">
        {props.children}
      </div>
    </>
  );
};

export default MainBody;
