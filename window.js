const { BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { loadGitHubContent, getLocalFile } = require('./preloader');

class WindowManager {
    constructor() {
        this.windows = new Map();
        this.setupIPC();
    }

    setupIPC() {
        ipcMain.handle('get-local-file', async (event, filePath) => {
            try {
                return await getLocalFile(filePath);
            } catch (error) {
                console.error('File access error:', error);
                return null;
            }
        });
    }

    async createMainWindow(url) {
        const mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                preload: path.join(__dirname, 'preloader.js')
            }
        });

        if (url.startsWith('https://raw.githubusercontent.com/')) {
            const contentUrl = await loadGitHubContent(url);
            mainWindow.loadURL(contentUrl);
        }

        this.setupMainWindowMenu(mainWindow);
        this.windows.set('main', mainWindow);
        
        return mainWindow;
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
        mainWindow.setMenu(menu);
    }
}

const windowManager = new WindowManager();
module.exports = { windowManager };