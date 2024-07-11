import React, { useState } from "react";
import './App.css';

function App() {
  const [startPage, setStartPage] = useState("");
  const [maxPage, setMaxPage] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (startPage <= 0 || maxPage <= 0) {
      alert("Page numbers must be positive integers.");
      return;
    }

    if (parseInt(maxPage) < parseInt(startPage)) {
      alert("Max Page must be greater than or equal to Start Page.");
      return;
    }

    setOutput("Script running...");

    try {
      const response = await fetch("/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          startPage,
          maxPage,
        }),
      });

      const result = await response.text();
      setOutput("Done! File Was Saved!");
      console.log(result);
    } catch (error) {
      setOutput("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Crypto Wallet Scraper</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startPage">Start Page:</label>
          <input
            type="number"
            id="startPage"
            name="startPage"
            value={startPage}
            onChange={(e) => setStartPage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxPage">Max Page:</label>
          <input
            type="number"
            id="maxPage"
            name="maxPage"
            value={maxPage}
            onChange={(e) => setMaxPage(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Run Script" />
      </form>
      <div className="output">
        {output}
      </div>
    </div>
  );
}

export default App;
