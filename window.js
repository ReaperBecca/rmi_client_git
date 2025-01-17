const { BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { buildPageUrl } = require('./preloader');

class WindowManager {
    constructor() {
        this.windows = new Map();
    }

    createMainWindow(config) {
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            icon: path.join(__dirname, 'current logo.ico'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js')
            },
        });

        mainWindow.maximize();

        const homeUrl = buildPageUrl(config, 'Home');
        mainWindow.loadURL(homeUrl);

        this.setupMainWindowMenu(mainWindow);
        this.registerWindow('main', mainWindow, null);

        return mainWindow;
    }

    createGameWindow(gameFolderName, startPath) {
        const mainWindow = this.windows.get('main');
        const gameWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            title: gameFolderName,
            icon: path.join(__dirname, 'current logo.ico'),
            parent: mainWindow,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        gameWindow.loadFile(startPath);
        gameWindow.maximize();
        
        this.registerWindow('game', gameWindow, 'main');
        
        return gameWindow;
    }

    registerWindow(id, window, parentId) {
        this.windows.set(id, window);
        
        window.on('closed', () => {
            this.windows.delete(id);
            this.closeChildWindows(id);
        });
    }

    closeChildWindows(parentId) {
        for (const [id, window] of this.windows.entries()) {
            if (window.getParentWindow() === this.windows.get(parentId)) {
                window.close();
            }
        }
    }

    setupMainWindowMenu(mainWindow) {
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
}

const windowManager = new WindowManager();
module.exports = { windowManager };
