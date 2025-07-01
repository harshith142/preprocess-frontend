import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Welcome to the Preprocessing App</h2>
      <Link to="/upload">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Start Uploading
        </button>
      </Link>
    </div>
  );
};

export default Home;
