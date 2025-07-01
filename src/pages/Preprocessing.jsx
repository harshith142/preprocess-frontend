import React, { useState } from "react";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

const Preprocessing = () => {
  const [missingMethod, setMissingMethod] = useState("mean");
  const [encodingMethod, setEncodingMethod] = useState("label");
  const [handleOutliers, setHandleOutliers] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const filename = localStorage.getItem("processedFilename");

  const handleSubmit = async () => {
    if (!filename) {
      setStatus("No uploaded file found.");
      return;
    }

    const formData = new FormData();
    formData.append("file", filename);
    formData.append("handleMissing", true);
    formData.append("missingMethod", missingMethod);
    formData.append("handleEncoding", true);
    formData.append("encodingMethod", encodingMethod);
    formData.append("handleOutliers", handleOutliers);

    try {
      const response = await fetch(`${BASE_URL}/preprocess/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("processedFilename", result.filename);
        navigate("/results");
      } else {
        setStatus("Processing failed.");
      }
    } catch (err) {
      console.error("Error processing file:", err);
      setStatus("Processing error.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Choose Preprocessing Options</h2>

      <label className="block mb-2">
        Missing Value Method:
        <select
          value={missingMethod}
          onChange={(e) => setMissingMethod(e.target.value)}
          className="ml-2"
        >
          <option value="mean">Mean</option>
          <option value="median">Median</option>
          <option value="mode">Mode</option>
        </select>
      </label>

      <label className="block mb-2">
        Encoding Method:
        <select
          value={encodingMethod}
          onChange={(e) => setEncodingMethod(e.target.value)}
          className="ml-2"
        >
          <option value="label">Label Encoding</option>
          <option value="onehot">One Hot Encoding</option>
        </select>
      </label>

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={handleOutliers}
          onChange={(e) => setHandleOutliers(e.target.checked)}
        />
        <span className="ml-2">Handle Outliers</span>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Process File
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default Preprocessing;

