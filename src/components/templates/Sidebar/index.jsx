import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div className="main-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width={156 / 3} height={111 / 3} viewBox="0 0 130 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81 25L43 92.5H27L0 46L27 0H42.5L16 46L34.5 79.5L65.5 25H81Z" fill="#19F8FF"></path>
            <path d="M50 14L57.5 0H102.5L129.5 46L102.5 92.5H87.5L72.5 67L80 54L95 79.5L114 46L95 14H50Z" fill="white"></path>
          </svg>
          <div className="sidebar-logo-title">RESTU BOT</div>
        </div>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-wrapper">
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/masters">Master Data</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/scheduler">Scheduler</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/bulk">Bulk Message</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/whatsapp">Whatsapp</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
