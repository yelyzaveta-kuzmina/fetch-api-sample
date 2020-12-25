import React, { useState, useCallback, useEffect } from "react";
import Switch from "./components/switcher";
import YouTubeApiHandler from "./modules/YouTube";
import WikiApiHandler from "./modules/Wiki";
import "./index.css";

const App = () => {
  const [isSwitcherChecked, setSwitcherChecked] = useState();

  useEffect(() => {
    const isSwitcherCheckedInStorage = localStorage.getItem(
      "isSwitcherChecked"
    );

    if (isSwitcherCheckedInStorage === null) {
      setSwitcherChecked(false);
      localStorage.setItem("isSwitcherChecked", 0);
      return;
    }
    setSwitcherChecked(Number(isSwitcherCheckedInStorage));
  }, []);

  const onSwitcherToggle = useCallback(() => {
    if (isSwitcherChecked) {
      setSwitcherChecked(false);
      localStorage.setItem("isSwitcherChecked", 0);
      return;
    }
    setSwitcherChecked(true);
    localStorage.setItem("isSwitcherChecked", 1);
  }, [isSwitcherChecked]);

  return (
    <div className="appWrapper">
      <div className="controller">
        <span className="moduleName">YouTube</span>
        <Switch
          onChange={() => onSwitcherToggle()}
          checked={Boolean(isSwitcherChecked)}
        />
        <span className="moduleName">Wiki</span>
      </div>
      {isSwitcherChecked ? <WikiApiHandler /> : <YouTubeApiHandler />}
    </div>
  );
};

export default App;
