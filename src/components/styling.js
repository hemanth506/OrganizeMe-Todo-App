const createButton = (borderRadius, fontSize, minWidth, backgroundColor) => {
  return {
    borderRadius: borderRadius,
    padding: "13px 0px",
    fontSize: fontSize,
    minWidth: minWidth,
    backgroundColor: backgroundColor,
  };
};

module.exports = { createButton };
