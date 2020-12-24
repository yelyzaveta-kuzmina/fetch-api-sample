import React from "react";
import Switch from "react-switch";

const Switcher = ({ onChange, checked }) => {
  return (
    <Switch
      uncheckedIcon={false}
      checkedIcon={false}
      activeBoxShadow={null}
      onColor={"#3366CC"}
      offColor={"#ED3833"}
      height={20}
      width={50}
      handleDiameter={25}
      onChange={onChange}
      checked={checked}
      boxShadow="lime"
    />
  );
};

export default Switcher;
