const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        'postcss-preset-env',
        tailwindcss("./confs/tailwind.config.js"),
        require('autoprefixer')
    ],
};