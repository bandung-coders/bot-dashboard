import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "services/axios";
import { Button } from "components/atoms";

const Checkin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: email,
      password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post("auth/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 400);
      }
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("SOMETHING WRONG");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute-center width-full height-full">
      <div className="box-checkin">
        <div className="checkin-logo">
          <svg width={156 / 2.5} height={111 / 2.5} viewBox="0 0 130 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81 25L43 92.5H27L0 46L27 0H42.5L16 46L34.5 79.5L65.5 25H81Z" fill="#19F8FF"></path>
            <path d="M50 14L57.5 0H102.5L129.5 46L102.5 92.5H87.5L72.5 67L80 54L95 79.5L114 46L95 14H50Z" fill="white"></path>
          </svg>
        </div>
        <div className="checkin-title text-center mt-3">
          LOGIN TO USE BOT
        </div>
        <form onSubmit={onSubmit} className="mt-4">
          <input
            type="text"
            className="form-input dark"
            onChange={(e) => { setEmail(e.target.value); }}
            placeholder="EMAIL"
          />
          <input
            type="password"
            className="form-input dark mt-3"
            onChange={(e) => { setPassword(e.target.value); }}
            placeholder="PASSWORD"
          />
          <div className="mb-8 mt-5 px-10">
            <Button
              type="submit"
              className="btn-checkin"
              loading={isLoading}
            >
              LOGIN
            </Button>
          </div>
          <div className="text-center">
            <Link to="/register" className="hidden-anchor bold c-white py-4 px-2"> REQUEST ACCOUNT </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkin;
