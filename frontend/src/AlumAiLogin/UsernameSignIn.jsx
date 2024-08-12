import React, { useState } from "react";
import { GreenTryTryTry } from "./GreenTryTryTry";
import "./style.css";
import alumaiLogo from './img/alumai-logo.png';
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const UsernameSignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation
    if (!username || !password) {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get("http://localhost:3006/login", {
        params: { username, password },
      });

      if (response.status === 200) {
        // Success
        toast({
          title: "Logged in.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("username", username);
        window.location.href = "/chatbot"; // Navigate to the chatbot page
      } else {
        // Error
        toast({
          title: "Error.",
          description: "Login failed. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle error
      toast({
        title: "Error.",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    // Clear fields (optional)
    setUsername("");
    setPassword("");
  };


  return (
    <div className="username-sign-in">
      <div className="logo-container">
        <div className="div-2-HomePage">
          <div className="text-wrapper-2-HomePage">ALUM</div>
          <div className="text-wrapper-3-HomePage">AI</div>
        </div>
      </div>

      <div className="frame">
        <div className="sign-in-popup">
          <div className="overlap">
            <div className="group">
              <div className="overlap-group">
                <div className="text-wrapper">Log out</div>
              </div>
            </div>
            <div className="div">Next</div>
            <div className="text-wrapper-2">Sign in to AlumAI</div>
            <div className="div-wrapper">
              {/* Replace text-wrapper-3 with an input for the username */}
              <input
                type="text"
                className="text-wrapper-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="frame-2">
              {/* Replace text-wrapper-4 with an input for the password */}
              <input
                type="password"
                className="text-wrapper-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>
        <img className="alumai-logo" alt="Alumai logo" src={alumaiLogo} />
      </div>
      {/* Transform frame-3 into a button to submit the login form */}
      <button
        className="frame-3"
        onClick={handleLogin}
      >
        <GreenTryTryTry className="GREEN-TRY-TRY-TRY-instance" />
        <div className="text-wrapper-5">Next</div>
      </button>
    </div>
  );
};
