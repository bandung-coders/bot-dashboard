import React, { useState } from "react";

const Checkin = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="absolute-center width-full height-full">
      <div className="box-checkin">
        <div className="checkin-logo">
          <svg width={156 / 1.5} height={111 / 1.5} viewBox="0 0 130 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81 25L43 92.5H27L0 46L27 0H42.5L16 46L34.5 79.5L65.5 25H81Z" fill="#19F8FF"></path>
            <path d="M50 14L57.5 0H102.5L129.5 46L102.5 92.5H87.5L72.5 67L80 54L95 79.5L114 46L95 14H50Z" fill="white"></path>
          </svg>
        </div>
        <div className="checkin-title text-center mt-3">
          CHECKIN TO RESTU BOT
        </div>
        <form onSubmit={onSubmit} className="mt-4">
          <input
            type="email"
            className="form-input dark text-center"
            onChange={(e) => { setEmail(e.target.value); }}
            placeholder="PUT YOUR EMAIL"
          />
          <button type="submit" className="btn-checkin mt-5"> CHECK IN </button>
        </form>
      </div>
    </div>
  );
};

export default Checkin;
