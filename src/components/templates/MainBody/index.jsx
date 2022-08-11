import React, { useState, useEffect } from "react";
import { Sidebar } from "components/templates";
import { getBotLocalData } from "utils/helpers";
import { useLocation } from "react-router-dom";

const MainBody = (props) => {
  const location = useLocation();
  const [bot, setBot] = useState("bot-1");

  useEffect(() => {
    getBot();
  }, []);

  const setBotLocalData = (e) => {
    localStorage.setItem("bot", e.target.value);
    setBot(e.target.value);
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  const getBot = () => {
    const results = getBotLocalData();
    setBot(results);
  };

  return (
    <>
      <div className="main-navbar">
        <h1>RESTU DWI CAHYO GANTENG</h1>
        <div className="bot">
          <div className="bot-label">
            SELECT BOT
          </div>
          <div className="bot-form">
            <select value={bot} onChange={setBotLocalData} className="form-bot">
              <option value="bot-1">BOT - 1</option>
              <option value="bot-2">BOT - 2</option>
              <option value="bot-3">BOT - 3</option>
              <option value="bot-4">BOT - 4</option>
            </select>
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="main-body">
        {props.children}
      </div>
    </>
  );
};

export default MainBody;
