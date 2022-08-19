import React, { useState, useEffect } from "react";
import { Sidebar } from "components/templates";
import { getBotLocalData } from "utils/helpers";
import { useLocation } from "react-router-dom";
import axios from "services/axios";

const MainBody = (props) => {
  const location = useLocation();
  const [botList, setBotList] = useState([
    {
      id: "bot-1",
      title: "CHANEL 1",
      waNumber: "",
      waName: "",
    },
  ]);
  const [bot, setBot] = useState("bot-1");

  useEffect(() => {
    getBotList();
    getBot();
  }, []);

  const setBotLocalData = (e) => {
    localStorage.setItem("bot", e.target.value);
    setBot(e.target.value);
    window.location.reload();
  };

  const getBot = () => {
    const results = getBotLocalData();
    setBot(results);
  };

  const getBotList = async () => {
    try {
      const response = await axios.get("/");
      const list = [];
      if (response.data.whatsapp_bot) {
        let i = 1;
        const whatsappBot = response.data.whatsapp_bot;
        for (const key in whatsappBot) {
          list.push({
            id: key,
            title: "CHANNEL " + i,
            waNumber: whatsappBot[key].information.me ? whatsappBot[key].information.me.user : "",
            waName: whatsappBot[key].information.pushname ? whatsappBot[key].information.pushname : "",
          });
          i++;
        }
      }
      setBotList(list);
    } catch (error) {
      setBotList([]);
    }
  };

  return (
    <>
      <div className="main-navbar">
        <h1>RESTU DWI CAHYO GANTENG</h1>
        <div className="bot">
          <div className="bot-label">
            SELECT CHANNEL
          </div>
          <div className="bot-form">
            <select value={bot} onChange={setBotLocalData} className="form-bot">
              {
                botList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                    {
                      item.waName &&
                      ` - ${item.waName}`
                    }
                    {
                      item.waNumber &&
                      ` - ${item.waNumber}`
                    }
                  </option>
                ))
              }
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
