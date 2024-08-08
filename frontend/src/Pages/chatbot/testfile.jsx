import { Button } from "antd";
import React from "react";

export const DownloadLink = ({ url, fileName }) => {
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={handleDownload}>
        Download Sample
      </Button>
    </div>
  );
};
