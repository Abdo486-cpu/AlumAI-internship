import { Button } from "antd";
import React from "react";

export const DownloadLink = ({ url, fileName }) => {
  const handleClick = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || "downloaded-file";
      link.target = "_blank"; // Open the download in a new tab

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Download Sample
      </Button>
    </div>
  );
};
