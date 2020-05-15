// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

module.exports = {
  presets: ["@vue/app"],
  plugins:[
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
  ]
};
