import React from "react";

export default function Results() {
  const handleDownload = () => {
    // This will eventually point to your backend's processed file
    window.open("http://localhost:8000/download", "_blank");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Preprocessing Complete</h2>
      <p className="mb-4 text-gray-600">You can now download the preprocessed dataset below.</p>
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download File
      </button>
    </div>
  );
}
