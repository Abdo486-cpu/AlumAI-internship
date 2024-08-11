import React from "react";
import { Background } from "../Background/Background";
import "./style.css";
import logo from "../AlumAi/img/alumai-logo.png";
import infoOutline from "../AlumAi/img/info-outline.svg";
import vector1 from "../AlumAi/img/vector-1.svg";
import moonSolid1 from "../AlumAi/img/moon-solid-1.svg";
import infonone from "../AlumAi/img/notifications-none.svg";
import recordVector from "../AlumAi/img/record-vector.svg";
import pictureVector from "../AlumAi/img/picture-vector.svg";
import sendVector from "../AlumAi/img/send-vector.svg";
import rectangle2879 from "../AlumAi/img/rectangle-2879.svg";


export const AlumAi = () => {
  return (
    <div className="ALUM-AI">
      <div className="overlap-wrapper">
        <div className="overlap">
          <Background className="background-instance" />
          <div className="menu">
            <div className="misc">
              <div className="avatar-style" />
              <img className="info-outline" alt="Info outline" src={infoOutline} />
              <img className="moon-solid" alt="Moon solid" src={moonSolid1} />
              <img className="notifications-none" alt="Notifications none" src={infonone} />
            </div>
          </div>
          <div className="for-future-uccess">For Future&nbsp;&nbsp;&nbsp;&nbsp;uccess</div>
          <div className="trengthening">&nbsp;&nbsp;trengthening Networks</div>
          <img className="vector" alt="Vector" src={vector1} />
          <img className="img" alt="Vector" src={vector1} />
          <p className="text-wrapper">Transform alumni data management through automation</p>
          <img className="alumai-logo" alt="Alumai logo" src={logo} />
          <div className="type-bar">
            <div className="frame">
              <img className="record-vector" alt="Record vector" src={recordVector} />
              <img className="picture-vector" alt="Picture vector" src={pictureVector} />
              <div className="div">Search for an Alumni</div>
              <img className="send-vector" alt="Send vector" src={sendVector} />
            </div>
          </div>
          <img className="rectangle" alt="Rectangle" src={rectangle2879} />
          <div className="text-wrapper-2">AI</div>
          <div className="text-wrapper-3">ALUM</div>
        </div>
      </div>
    </div>
  );
};
