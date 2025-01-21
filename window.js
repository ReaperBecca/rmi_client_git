const { BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { ensureDirectoryExists, initializeAppData } = require('./preloader');

class WindowManager {
    constructor() {
        this.windows = new Map();
        this.defaultTemplate = [
            {
                label: process.platform === 'darwin' ? 'App' : 'File',
                submenu: [
                    { role: 'quit' }
                ]
            }
        ];
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

    createMainWindow(url = '') {
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false, // Disable Node.js integration for security
                contextIsolation: true, // Enable context isolation
            },
            backgroundColor: '#000000', // Set background to black
            icon: path.join(__dirname, 'current logo.ico') // Set the window icon
        });

        if (url && url.startsWith('https://raw.githubusercontent.com/') && url.endsWith('.js')) {
            // Load the JavaScript file in a browser context using an HTML wrapper
            const htmlContent = `
                <html>
                <head>
                    <title>Script Execution</title>
                </head>
                <body style="background-color:black;">
                    <script src="${url}"></script>
                </body>
                </html>
            `;
            mainWindow.loadURL(`data:text/html,${encodeURIComponent(htmlContent)}`);
        } else if (url) {
            mainWindow.loadURL(url);
        } else {
            mainWindow.loadURL('data:text/html,<body style="background-color:black;"></body>');
        }

        this.setupMainWindowMenu(mainWindow);
        this.windows.set('main', mainWindow);
    }
}

const windowManager = new WindowManager();
module.exports = { windowManager };