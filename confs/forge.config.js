const path = require('path');
const rootDir = process.cwd();

module.exports = {

    packagerConfig: {

        asar: true,

        executableName: 'test',

        appCopyright: '© 2021-2024 Codesbiome, Guasam',

    },

    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'electron-react-typescript-webpack-2022',
            },
        },
        {

            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {

            name: '@electron-forge/maker-deb',
            config: {},
        },
        {

            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],

    plugins: [
        {
            name: '@electron-forge/plugin-webpack',
            config: {

                devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-inline' data:`,

                port: 3000,

                loggerPort: 9000,

                mainConfig: path.join(rootDir, 'confs/webpack.main.js'),

                renderer: {

                    config: path.join(rootDir, 'confs/webpack.renderer.js'),

                    entryPoints: [
                        {

                            name: '',

                            rhmr: 'react-hot-loader/patch',

                            html: path.join(rootDir, 'src/renderer/index.html'),

                            js: path.join(rootDir, 'src/renderer/index.tsx'),

                            preload: {
                                js: path.join(rootDir, 'src/main/preloads/preload.ts'),
                            },
                        },
                    ],
                },
                devServer: {
                    liveReload: false,
                },
            },
        },
    ],
};
