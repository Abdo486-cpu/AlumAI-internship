/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import topGradient from "../AlumAi/img/top-gradient.png";

export const Background = ({ className }) => {
  return (
    <div className={`background ${className}`}>
      <div className="overlap-group">
        <img className="top-gradient" alt="Top gradient" src={topGradient} />
      </div>
    </div>
  );
};
