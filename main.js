const { app } = require('electron');
const { fetchSubdirConfig, buildPageUrl, initializeAppData } = require('./preloader');
const { windowManager } = require('./window');

app.on('ready', async () => {
    try {
        // Initialize app data directories
        initializeAppData();

        // Fetch configuration
        const config = await fetchSubdirConfig();

        // Build the URL for window.js
        const windowUrl = buildPageUrl(config, 'Window');

        // Create and open the main window at the specified URL
        windowManager.createMainWindow(config);

        // Load the window.js URL
        const mainWindow = windowManager.windows.get('main');
        mainWindow.loadURL(windowUrl);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (windowManager.windows.size === 0) {
        app.emit('ready');
    }
});
