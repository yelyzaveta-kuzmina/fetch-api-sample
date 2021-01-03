import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import { customSvg } from "../../helpers";
import "./index.css";

const WikiApiHandler = () => {
  const [inputValue, setInputValue] = useState(null);
  const [data, setData] = useState(null);
  const [svg, setSvg] = useState(null);

  const fetchSVG = async () => {
    const svg = await fetch(`http://localhost:8080/empire.svg`).then((res) =>
      res.text()
    );
    setSvg(svg);
  };

  const fetchHTMLContent = async () => {
    const fetchedData = await fetch(`http://localhost:8080`).then((res) =>
      res.text()
    );

    setData(fetchedData);

    if (fetchedData.includes(inputValue)) {
      alert("Word found and added to the local localDB!");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: inputValue,
          svg: customSvg(randomColor(), svg),
        }),
      };
      fetch("http://localhost:3000/localDb", requestOptions).then((response) =>
        response.json()
      );
    }
  };

  useEffect(() => {
    fetchSVG();
  }, []);

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
