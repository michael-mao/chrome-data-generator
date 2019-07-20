import CopyWebpackPlugin from 'copy-webpack-plugin'

export default config => {
  // overwrite default PWA manifest.json with chrome extension manifest.json
  config.plugins.push(new CopyWebpackPlugin([
    { context: `${__dirname}/src/assets`, from: `manifest.json`, force: true }
  ]));
}
