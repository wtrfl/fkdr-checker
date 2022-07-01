const { app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain;

const createWindow = () => {

    // Create splash screen to counter ... WINDOWS 10!!!!!!
    // solution by Joshua https://stackoverflow.com/questions/67874431/dealing-with-slow-electron-startup
    var loadingWindow = new BrowserWindow({
        width: 300,
        height: 100,
        transparent: true, // Transparency doesn't work on Linux.
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        skipTaskbar: true,
        title: "Loading..."
    });

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 500, //500 (1000 debug)
        height: 325, //325 (1000 debug)
        resizable: true,
        minWidth: 500,
        minHeight: 325,
        autoHideMenuBar: true,
        title: "fkdr checker",
        icon: "./assets/icon.ico",
        transparent: true,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    //loadingWindow.loadURL('file://' + __dirname + '/assets/loading.png')
    
    // temporarily removed for development on linux
    loadingWindow.loadFile('src/loading.html')
    mainWindow.loadFile('src/index.html')

    mainWindow.webContents.once('did-finish-load', function() {
        mainWindow.show();
        loadingWindow.close();
    });

    /*const apiWindow = new BrowserWindow({
        width: 500,
        height: 325,
        resizable: false,
        autoHideMenuaBar: true,
        title: "enter hypixel api key",
        icon: "./assets/icon.ico",
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })*/

    
    //mainWindow.webContents.openDevTools()

    ipc.on('minimizeApp', () => {
        mainWindow.minimize()
    })

    ipc.on('closeApp', () => {
        mainWindow.close()
        app.quit()
    })

    /*ipc.on('apiMinimize', () => {
        apiWindow.minimize()
    })

    ipc.on('apiClose', () => {
        apiWindow.close()
    })*/
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