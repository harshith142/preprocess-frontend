import React, { useState } from "react";

export default function Preprocessing() {
  const [options, setOptions] = useState({
    handleMissing: false,
    missingMethod: "drop",
    encodeCategorical: false,
    encodingMethod: "onehot",
    scaleNumeric: false,
    scaleMethod: "standard",
    handleOutliers: false,
    outlierMethod: "zscore",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Selected Preprocessing Config:", options);
    // Later: send to backend with file
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Choose Preprocessing Options</h2>

      {/* Missing Values */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="handleMissing"
            checked={options.handleMissing}
            onChange={handleChange}
          />
          Handle Missing Values
        </label>
        {options.handleMissing && (
          <select
            name="missingMethod"
            value={options.missingMethod}
            onChange={handleChange}
            className="mt-2 block border p-2 rounded"
          >
            <option value="drop">Drop rows</option>
            <option value="mean">Fill with Mean</option>
            <option value="median">Fill with Median</option>
            <option value="mode">Fill with Mode</option>
            <option value="constant">Fill with Constant</option>
          </select>
        )}
      </div>

      {/* Encoding */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="encodeCategorical"
            checked={options.encodeCategorical}
            onChange={handleChange}
          />
          Encode Categorical Variables
        </label>
        {options.encodeCategorical && (
          <select
            name="encodingMethod"
            value={options.encodingMethod}
            onChange={handleChange}
            className="mt-2 block border p-2 rounded"
          >
            <option value="onehot">One-Hot Encoding</option>
            <option value="label">Label Encoding</option>
          </select>
        )}
      </div>

      {/* Scaling */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="scaleNumeric"
            checked={options.scaleNumeric}
            onChange={handleChange}
          />
          Scale Numeric Data
        </label>
        {options.scaleNumeric && (
          <select
            name="scaleMethod"
            value={options.scaleMethod}
            onChange={handleChange}
            className="mt-2 block border p-2 rounded"
          >
            <option value="standard">Standard Scaling</option>
            <option value="minmax">Min-Max Scaling</option>
            <option value="robust">Robust Scaling</option>
          </select>
        )}
      </div>

      {/* Outliers */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="handleOutliers"
            checked={options.handleOutliers}
            onChange={handleChange}
          />
          Handle Outliers
        </label>
        {options.handleOutliers && (
          <select
            name="outlierMethod"
            value={options.outlierMethod}
            onChange={handleChange}
            className="mt-2 block border p-2 rounded"
          >
            <option value="zscore">Z-Score Method</option>
            <option value="iqr">IQR Method</option>
          </select>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Proceed to Apply
      </button>
    </div>
  );
}
