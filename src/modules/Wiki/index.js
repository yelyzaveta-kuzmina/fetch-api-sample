import React, { useState } from "react";
import "./index.css";

const WikiApiHandler = () => {
  const [inputValue, setInputValue] = useState(null);
  const [data, setData] = useState(null);

  const fetchHTMLContent = async () => {
    const fetchedData = await fetch(`http://localhost:8080`).then((res) =>
      res.text()
    );

    setData(fetchedData);

    if (fetchedData.includes(inputValue)) {
      alert("Word found and added to the local videosDB!");
    }
  };

  return (
    <div className="wikiHandlerContent">
      <div className="searchArea">
        <input
          placeholder="Type a word to search for"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button disabled={!inputValue} onClick={() => fetchHTMLContent()}>
          Search
        </button>
        <pre>
          {data ? "Fetched HTML:" : null}
          <br />
          <br />
          <br />
          {data}
        </pre>
      </div>
    </div>
  );
};

export default WikiApiHandler;
