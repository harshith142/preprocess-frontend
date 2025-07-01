import React, { useState } from "react";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus("Upload successful!");
        localStorage.setItem("processedFilename", result.filename);
        navigate("/preprocess"); // go to preprocessing page
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload error.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload CSV or Excel File</h2>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload File
      </button>
      {uploadStatus && <p className="mt-4 text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default Upload;

