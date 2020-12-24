import React, { useState, useCallback } from "react";
import Switch from "./components/switcher";
import YouTubeApiHandler from "./modules/YouTube";
import WikiApiHandler from "./modules/Wiki";
import "./index.css";

const App = () => {
  const [isSwitcherChecked, setSwitcherChecked] = useState(false);

  const onSwitcherToggle = useCallback(() => {
    if (isSwitcherChecked) {
      setSwitcherChecked(false);
      return;
    }
    setSwitcherChecked(true);
  }, [isSwitcherChecked]);

  return (
    <div className="appWrapper">
      <div className="controller">
        <span className="moduleName">YouTube</span>
        <Switch
          onChange={() => onSwitcherToggle()}
          checked={isSwitcherChecked}
        />
        <span className="moduleName">Wiki</span>
      </div>
      {isSwitcherChecked ? <WikiApiHandler /> : <YouTubeApiHandler />}
    </div>
  );
};

export default App;
