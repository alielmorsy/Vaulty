import {app, BrowserWindow} from "electron";
import * as path from "path";

//The variable declared by electron forge to access the page.
declare const _WEBPACK_ENTRY: string;

//The variable declared by electron forge to access the preload script.
declare const _PRELOAD_WEBPACK_ENTRY: string;

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: _PRELOAD_WEBPACK_ENTRY,
        },
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(_WEBPACK_ENTRY).then(r => console.log("WTF " + r));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

(() => {
    app.whenReady().then(() => {
        createWindow();

        app.on("activate", function () {
            // On macOS, it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });

    });
})()
