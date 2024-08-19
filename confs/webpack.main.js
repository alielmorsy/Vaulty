const {merge} = require("webpack-merge")
const config = {
    entry: ['./src/main/app.ts']
}
module.exports =merge(require("./webpack.common"), config)

