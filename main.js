const { app } = require('electron');
const { windowManager } = require('./window');
const { initializeAppData, syncDefaultThemes } = require('./preloader');

app.on('ready', () => {
    initializeAppData();
    syncDefaultThemes();
    windowManager.createMainWindow('https://reaperbecca.github.io/rmi_client_git/');
});
