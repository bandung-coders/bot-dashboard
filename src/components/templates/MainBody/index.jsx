import React, { useState, useEffect } from "react";
import { Sidebar } from "components/templates";
import { getBotLocalData } from "utils/helpers";
import { useLocation } from "react-router-dom";
import axios from "services/axios";

const MainBody = (props) => {
  const location = useLocation();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
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

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
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
        <h2>RESTU DWI CAHYO GANTENG</h2>
        <button
          type="button"
          className="toggle-sidebar"
          onClick={() => {
            toggleSidebar();
          }}
        >
          <span className="resitdc icon-menu"></span>
        </button>
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
        {/* <div className="user">
          <div className="user-avatar">
            <img src="https://resitdc.s3.ap-southeast-1.amazonaws.com/images/avatar/resitdc-2.jpg" alt="USER AVATAR IMAGE" className="user-avatar-image" />
          </div>
          <div className="user-name">RESTU DWI CAHYO</div>
        </div> */}
      </div>
      <Sidebar onClose={() => { setIsOpenSidebar(false); }} isActive={isOpenSidebar} />
      <div className="main-body">
        {props.children}
      </div>
    </>
  );
};

export default MainBody;
