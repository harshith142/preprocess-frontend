import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setPreviewData(json.slice(0, 10)); // only show first 10 rows
    };

    reader.readAsBinaryString(selectedFile);
    setFile(selectedFile);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload CSV or Excel File</h2>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewData.length > 0 && (
        <div className="mt-4 border p-4 rounded">
          <h3 className="font-semibold mb-2">Preview (First 10 rows)</h3>
          <table className="table-auto text-sm">
            <tbody>
              {previewData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
