const { app } = require('electron');
const { windowManager } = require('./window');
const { initializeAppData, syncDefaultThemes } = require('./preloader');

app.on('ready', () => {
    initializeAppData();
    syncDefaultThemes();
    windowManager.createMainWindow('https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Pages/home.js');

    // remove 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Home/home.js' to open as a blank page
});
