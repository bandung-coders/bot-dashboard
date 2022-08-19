import React, { useState, useEffect } from "react";
import Routes from "./routes.jsx";
import { Main } from "components/templates";
import jwtDecode from "jwt-decode";
import { Modal } from "components/molecules";
import { Button } from "components/atoms";
import "assets/style/main.scss";

const App = () => {
  const [isEnd, setIsEnd] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if (token) {
      const tokenDecoded = jwtDecode(token);
      const tokenExpire = parseInt(tokenDecoded.exp) * 1000;
      const betweenTwoDate = tokenExpire - Date.now();

      if (betweenTwoDate <= 0) {
        setIsEnd(true);
      }

      if (betweenTwoDate > 1) {
        setTimeout(() => {
          setIsEnd(true);
        }, betweenTwoDate);
      }
    }
  };

  return (
    <Main>
      <Modal show={isEnd} radius="md" size="lg">
        <div className="px-3 py-15">
          <h1 className="text-center" style={{ color: "var(--color-red-1)" }}>
            SESI KAMU SUDAH HABIS
          </h1>
          <div className="mt-8 text-center">
            <Button
              type="button"
              color="black"
              radius="lg"
              md
              className="px-7"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              LOGIN ULANG
            </Button>
          </div>
        </div>
      </Modal>
      <Routes />
    </Main>
  );
};

export default App;
