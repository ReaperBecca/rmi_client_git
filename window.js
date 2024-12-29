const { BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let gameWindow;

function createGameWindow(gameFolderName, startPath) {
    gameWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        title: gameFolderName,
        icon: path.join(__dirname, 'current logo.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js') // Add preload script
        }
    });

    gameWindow.loadFile(startPath); // Use the start path to load the game
    gameWindow.maximize();

    gameWindow.on('closed', () => {
        gameWindow = null;
    });
}

function createWindow() {
    const subdirConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'subdir.json'), 'utf8'));
    const homePath = path.join(__dirname, subdirConfig.Home.local, 'home.html');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'current logo.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js') // Add preload script
        },
    });

    mainWindow.maximize();

    // Try local first, then online
    if (fs.existsSync(homePath)) {
        mainWindow.loadFile(homePath);
    } else if (subdirConfig.Home.activeLink) {
        mainWindow.loadURL(`${subdirConfig.Home.activeLink}/home.html`);
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    const isMac = process.platform === 'darwin';
    const menuTemplate = [
        {
            label: isMac ? 'App' : 'File',
            submenu: [
                {
                    label: 'Login',
                    click: () => {
                        console.log('Login clicked');
                    },
                },
                { type: 'separator' },
                {
                    label: isMac ? 'Close' : 'Quit',
                    role: isMac ? 'close' : 'quit',
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

module.exports = { createWindow, createGameWindow };