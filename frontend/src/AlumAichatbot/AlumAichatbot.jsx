import React, { useState, useEffect, useRef } from "react";
import { Avatar, Progress } from "@chakra-ui/react";
import axios from "axios";
import "./chatbot.css";
import infoOutline from "../AlumAichatbot/static/img/info-outline.svg";
import moonSolid from "../AlumAichatbot/static/img/moon-solid-1.svg";
import notificationsNone from "../AlumAichatbot/static/img/notifications-none.svg";
import sendIcon from "../AlumAichatbot/static/img/image.png";
import { DownloadLink } from "./testfile.jsx";
import botAvatar from "./static/img/botAvatar.png";
import userAvatar from "./static/img/avatar.png";

export const Chatbot = () => {
  const [downloadUrl, setDownloadUrl] = useState("/files/export/users.csv");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get("http://localhost:3006/getChat", {
          params: { username },
        });
        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };
    fetchChat();
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { sender: "user", text: inputText }]);
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:3006/getQuery", {
          query: inputText,
          username,
        });

        const botResponse = response.data.content;
        setDownloadUrl(response.data.downloadUrl);

        if (typeof botResponse === "string") {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: botResponse },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Unexpected response format from the server." },
          ]);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Error fetching response from the server." },
        ]);
      }

      setLoading(false);
      setInputText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="macbook-air">

      <div className="logo-container">
        <div className="div-2-HomePage">
          <div className="text-wrapper-2-HomePage">ALUM</div>
          <div className="text-wrapper-3-HomePage">AI</div>
        </div>
      </div>

      <div className="menu">
        <div className="misc">
          <div className="avatar-style" />
          <img className="info-outline" alt="Info outline" src={infoOutline} />
          <img className="moon-solid" alt="Moon solid" src={moonSolid} />
          <img className="notifications-none" alt="Notifications none" src={notificationsNone} />
        </div>
      </div>

      <div className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-container ${msg.sender === "user" ? "user-message-container" : "bot-message-container"}`}
          >
            <div className="message-header">
              <Avatar
                name={msg.sender === "user" ? "User" : "Bot"}
                src={msg.sender === "user" ? userAvatar : botAvatar}
                size="sm"
                mr="2"
              />
              <span className="message-label">{msg.sender === "user" ? "You" : "AlumAi"}</span>
            </div>
            <div
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {loading && (
      <div className="loading-bar">
        <Progress size="xs" isIndeterminate />
      </div>
      )}

      <div className={`input-frame ${loading ? 'hidden' : ''}`}>
        <DownloadLink url={downloadUrl} fileName="users.csv" />
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className="send-button" onClick={handleSend} disabled={loading || !inputText.trim()}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
};
