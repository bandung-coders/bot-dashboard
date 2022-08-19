import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// #region - IMPORT PAGES
import Home from "pages/Home";
import History from "pages/History";
import Masters from "pages/Masters";
import Scheduler from "pages/Scheduler";
import SchedulerAdd from "pages/SchedulerAdd";
import Whatsapp from "pages/Whatsapp";
import Bulk from "pages/Bulk";
import Checkin from "pages/Checkin";
import Register from "pages/Register";
import Approval from "pages/Approval";
// #endregion - IMPORT PAGES

const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const RouteList = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp"
          element={
            <ProtectedRoute>
              <Whatsapp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/masters"
          element={
            <ProtectedRoute>
              <Masters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <Scheduler />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduler/add"
          element={
            <ProtectedRoute>
              <SchedulerAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk"
          element={
            <ProtectedRoute>
              <Bulk />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Checkin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/approval/:id" element={<Approval />} />
      </Routes>
    </Router>
  );
};

export default RouteList;
