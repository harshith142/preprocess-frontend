import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileId, setFileId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [preprocessingOptions, setPreprocessingOptions] = useState({
    removeDuplicates: false,
    fillMissing: false,
    lowercaseHeaders: false,
    normalizeWhitespace: false,
  });

  const BASE_URL = 'https://preprocess-backend.onrender.com'; // Your deployed backend

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_URL}/upload/`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Upload failed');
      }

      setFileName(result.filename);
      setFileType(result.file_type);
      setFileId(result.file_id);
      setCurrentPage('preprocess');
    } catch (err) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreprocess = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/preprocess/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: fileId,
          options: preprocessingOptions,
        }),
      });

      if (!response.ok) {
        throw new Error('Preprocessing failed.');
      }

      const result = await response.json();
      setFileId(result.file_id);
      setCurrentPage('results');
    } catch (err) {
      setError(err.message || 'An error occurred during preprocessing.');
    } finally {
      setLoading(false);
    }
  };

  const renderHome = () => (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        CSV/XLSX Preprocessor
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Clean, transform, and prepare your data before analysis. Just like I Love PDF, but for spreadsheets.
      </p>
      <button
        onClick={() => setCurrentPage('upload')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
      >
        Upload File
      </button>
    </section>
  );

  const renderUpload = () => (
    <section className="py-12">
      <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Upload File</h2>
        <p className="text-gray-400 mb-4">Supported formats: .csv and .xlsx</p>

        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile && ['csv', 'xlsx'].includes(selectedFile.name.split('.').pop().toLowerCase())) {
              setFile(selectedFile);
              setFileName(selectedFile.name);
            } else {
              setError('Only .csv or .xlsx files are allowed.');
            }
          }}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
        />

        {fileName && <p className="mt-4 text-green-400">Selected file: {fileName}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-400 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  );

  const renderPreprocess = () => (
    <section className="py-12">
      <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Configure Preprocessing</h2>
        <p className="text-gray-400 mb-6">Select the operations you'd like to perform:</p>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preprocessingOptions.removeDuplicates}
              onChange={(e) =>
                setPreprocessingOptions({
                  ...preprocessingOptions,
                  removeDuplicates: e.target.checked,
                })
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Remove duplicate rows</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preprocessingOptions.fillMissing}
              onChange={(e) =>
                setPreprocessingOptions({
                  ...preprocessingOptions,
                  fillMissing: e.target.checked,
                })
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Fill missing values</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preprocessingOptions.lowercaseHeaders}
              onChange={(e) =>
                setPreprocessingOptions({
                  ...preprocessingOptions,
                  lowercaseHeaders: e.target.checked,
                })
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Convert headers to lowercase</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preprocessingOptions.normalizeWhitespace}
              onChange={(e) =>
                setPreprocessingOptions({
                  ...preprocessingOptions,
                  normalizeWhitespace: e.target.checked,
                })
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Normalize whitespace in cells</span>
          </label>
        </div>

        {error && <p className="mt-6 text-red-400">{error}</p>}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentPage('upload')}
            className="text-gray-400 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={handlePreprocess}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Start Preprocessing'}
          </button>
        </div>
      </div>
    </section>
  );

  const renderResults = () => (
    <section className="py-12 text-center">
      <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Processing Complete!</h2>
        <p className="text-gray-300 mb-6">Your file has been successfully preprocessed.</p>
        <a
          href={`${BASE_URL}/download/${fileId}`}
          download
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          Download Processed File
        </a>
        <div className="mt-8">
          <button
            onClick={() => {
              setFile(null);
              setFileName('');
              setFileType('');
              setFileId('');
              setPreprocessingOptions({
                removeDuplicates: false,
                fillMissing: false,
                lowercaseHeaders: false,
                normalizeWhitespace: false,
              });
              setCurrentPage('home');
            }}
            className="text-blue-400 hover:text-blue-300"
          >
            Start Over
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            DataPrep.app
          </h1>
          <nav className="space-x-4 hidden md:flex">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-300">
              Home
            </button>
            <button onClick={() => setCurrentPage('upload')} className="hover:text-blue-300">
              Upload
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'upload' && renderUpload()}
        {currentPage === 'preprocess' && renderPreprocess()}
        {currentPage === 'results' && renderResults()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} DataPrep.app — Built using FastAPI & React</p>
      </footer>
    </div>
  );
};

export default App;

