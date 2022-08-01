import React from "react";
import Routes from "./routes.jsx";
import { Main } from "components/templates";
import "assets/style/main.scss";

const App = () => {
  return (
    <Main>
      <Routes />
    </Main>
  );
};

export default App;
