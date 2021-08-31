const { override, addLessLoader } = require("customize-cra");
const rewireSvgReactLoader = require("react-app-rewire-svg-react-loader");
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
  }),
  rewireSvgReactLoader
);
