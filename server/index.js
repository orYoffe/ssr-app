require("ignore-styles");
require("universal-fetch");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});

require("./server");
