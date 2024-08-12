import React from "react";
import { useNavigate } from "react-router-dom";
import "./styleHome.css";
import vector from "../img/vector.svg";
import vector1 from "../img/vector-1.svg";
import rectangle91909 from "../img/rectangle-91909.png";
import alumaiLogo from "../img/alumai-logo.png";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Replace '/target-page' with the path to the page you want to navigate to
  };

  return (
    <div className="frame-HomePage">
      <div className="div-2-HomePage">
        <div className="text-wrapper-2-HomePage">ALUM</div>
        <div className="text-wrapper-3-HomePage">AI</div>
      </div>
      <div className="element-HomePage">
        <div className="trengthening-HomePage"> trengthening Networks</div>
        <img className="vector-HomePage" alt="Vector" src={vector} />
        <div className="for-future-uccess-HomePage">For Future&nbsp;&nbsp;&nbsp;&nbsp;uccess</div>
        <img className="img-HomePage" alt="Vector" src={vector1} />
        <div className="overlap-wrapper-HomePage">
          <button className="overlap-button-HomePage" onClick={handleClick}>
            <img className="rectangle-HomePage" alt="Rectangle" src={rectangle91909} />
            <div className="text-wrapper-HomePage">Start</div>
          </button>
        </div>
        <img className="alumai-logo-HomePage" alt="Alumai logo" src={alumaiLogo} />
        <p className="div-HomePage">Transform alumni data management through automation</p>
      </div>
    </div>
  );
};
