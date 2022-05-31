const { app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain;

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 325,
        resizable: true,
        minWidth: 500,
        minHeight: 325,
        autoHideMenuBar: true,
        title: "fkdr checker",
        icon: "./assets/icon.ico",
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('src/index.html')
        //mainWindow.webContents.openDevTools()

    ipc.on('minimizeApp', () => {
        mainWindow.minimize()
    })

    ipc.on('closeApp', () => {
        mainWindow.close()
        app.quit()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})