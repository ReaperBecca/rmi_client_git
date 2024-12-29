const { app } = require('electron');
const { windowManager } = require('./window');
const fs = require('fs');
const path = require('path');
const https = require('https');

function tryLinks(links) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(links)) {
            links = [links];
        }

        let currentIndex = 0;

        function tryNextLink() {
            if (currentIndex >= links.length) {
                reject(new Error('No working links found'));
                return;
            }

            const link = links[currentIndex];
            https.get(link, (res) => {
                if (res.statusCode === 200) {
                    resolve(link);
                } else {
                    currentIndex++;
                    tryNextLink();
                }
            }).on('error', () => {
                currentIndex++;
                tryNextLink();
            });
        }

        tryNextLink();
    });
}

function loadDirectoryStructure() {
    const subdirConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'subdir.json'), 'utf8'));
    
    const promises = Object.entries(subdirConfig).map(async ([page, config]) => {
        const pagePath = path.join(__dirname, config.local);
        if (!fs.existsSync(pagePath)) {
            fs.mkdirSync(pagePath, { recursive: true });
        }

        // Always check online links for fallback
        if (config.online) {
            const links = Array.isArray(config.online) ? config.online : [config.online];
            try {
                const workingLink = await tryLinks(links);
                config.activeLink = workingLink;
            } catch {
                config.activeLink = null;
            }
        }
        return [page, config];
    });
    
    return Promise.all(promises).then(entries => Object.fromEntries(entries));
}

app.on('ready', async () => {
    const directoryStructure = await loadDirectoryStructure();
    windowManager.createMainWindow();
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
