const {merge} = require("webpack-merge")
const config = {
    devtool: 'inline-source-map'
}
module.exports = merge(require("./webpack.common"), config)