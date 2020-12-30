import React, { useCallback } from "react";
import { useLocalStorage } from "react-use";
import Switch from "./components/switcher";
import YouTubeApiHandler from "./modules/YouTube";
import WikiApiHandler from "./modules/Wiki";
import "./index.css";

const App = () => {
  const [isSwitcherChecked, setIsSwitcherChecked] = useLocalStorage(
    "isSwitcherChecked",
    false
  );

  const onSwitcherToggle = useCallback(
    () => setIsSwitcherChecked(!isSwitcherChecked),
    [isSwitcherChecked, setIsSwitcherChecked]
  );

  return (
    <div className="appWrapper">
      <div className="controller">
        <span className="moduleName">YouTube</span>
        <Switch
          onChange={onSwitcherToggle}
          checked={Boolean(isSwitcherChecked)}
        />
        <span className="moduleName">Wiki</span>
      </div>
      {isSwitcherChecked ? <WikiApiHandler /> : <YouTubeApiHandler />}
    </div>
  );
};

export default App;
