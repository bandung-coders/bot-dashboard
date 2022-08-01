import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// #region - IMPORT PAGES
import Home from "pages/Home";
import History from "pages/History";
import Masters from "pages/Masters";
import Scheduler from "pages/Scheduler";
import Whatsapp from "pages/Whatsapp";
import Bulk from "pages/Bulk";
// #endregion - IMPORT PAGES

const RouteList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/history" element={<History />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/bulk" element={<Bulk />} />
      </Routes>
    </Router>
  );
};

export default RouteList;
