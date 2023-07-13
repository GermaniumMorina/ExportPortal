import React from "react";
import "./Chat.css";
import { useNavigate } from "react-router-dom";

const ChatIcon = () => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/test-chat`);
  };
  return (
    <div>
      {/* <div id="mybutton">
        <button class="feedback" onClick={handleChat}>
          Test Chat
        </button>
      </div> */}
    </div>
  );
};

export default ChatIcon;
