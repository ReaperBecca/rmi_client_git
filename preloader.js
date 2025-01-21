const https = require('https');
const os = require('os');
const path = require('path');
const fs = require('fs');

function getAppDataPath() {
    const homeDir = os.homedir();
    const platform = os.platform();
    
    switch (platform) {
        case 'win32':
            return process.env.APPDATA;
        case 'darwin':
            return path.join(homeDir, 'Library', 'Application Support');
        case 'linux':
            // Check for ChromeOS
            if (fs.existsSync('/home/chronos')) {
                return '/home/chronos/user/';
            }
            // Check for Android on Linux (e.g., Android-x86)
            if (fs.existsSync('/data/data')) {
                return '/data/data';
            }
            return path.join(homeDir, '.local', 'share');
        default:
            throw new Error('Unsupported platform');
    }
}

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function initializeAppData() {
    const appDataPath = getAppDataPath();
    const clientDir = path.join(appDataPath, 'reapermediaindustries', 'RMI_Client');
    const clientThemes = path.join(clientDir, 'Themes');
    const themesReaperDark = path.join(clientThemes, 'Reaper\'sDarkMode');
    ensureDirectoryExists(themesReaperDark);

    return {
        appDataPath,
        clientDir,
        clientThemes,
        themesReaperDark
    };
}

function downloadFile(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(callback);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete the file on error
        if (callback) callback(err.message);
    });
}

function syncDefaultThemes() {
    const { themesReaperDark } = initializeAppData();  // Changed from themesReapersDarkMode
    const themeRDMUrls = [
        "https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Themes/Reaper%27sDarkMode/account.css",
        "https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Themes/Reaper%27sDarkMode/home.css",
        "https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Themes/Reaper%27sDarkMode/games.css",
        "https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Themes/Reaper%27sDarkMode/about.css",
        "https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/Themes/Reaper%27sDarkMode/navi.css"
    ];

    themeRDMUrls.forEach(url => {
        const fileName = path.basename(url);
        const destPath = path.join(themesReaperDark, fileName);  // Changed from themesReapersDarkMode
        
        downloadFile(url, destPath, (error) => {
            if (error) {
                console.error(`Error downloading ${fileName}: ${error}`);
            } else {
                console.log(`Downloaded ${fileName} to ${destPath}`);
            }
        });
    });
}
  
module.exports = {
    initializeAppData,
    ensureDirectoryExists,
    syncDefaultThemes
};