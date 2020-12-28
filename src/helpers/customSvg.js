const customSvg = (color, svgBody) => {
  const stringifiedSvg = JSON.stringify(svgBody);
  const updatedSvg = stringifiedSvg.replace("fill:#000", `fill:${color}`);
  return JSON.parse(updatedSvg);
};

export default customSvg;
