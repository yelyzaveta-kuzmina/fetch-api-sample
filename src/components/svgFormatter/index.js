import React from "react";

const SvgFormatter = ({ svg }) => {
  return <pre dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default SvgFormatter;

// I found couple of articles how to resize an svg, but any of them did not work me.
// Would be happy to check it out together
