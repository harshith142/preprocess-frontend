import React from "react";
import BASE_URL from "../config";

const Results = () => {
  const filename = localStorage.getItem("processedFilename");

  const handleDownload = () => {
    if (filename) {
      window.open(`${BASE_URL}/download/${filename}`, "_blank");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Download Processed File</h2>
      <button
        onClick={handleDownload}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Download File
      </button>
    </div>
  );
};

export default Results;
