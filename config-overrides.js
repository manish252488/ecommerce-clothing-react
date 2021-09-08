const { override, addLessLoader,addWebpackModuleRule } = require("customize-cra");
const rewireSvgReactLoader = require("react-app-rewire-svg-react-loader");
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
  }),
  rewireSvgReactLoader,
  addWebpackModuleRule({
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        },
      ],
  })
);
