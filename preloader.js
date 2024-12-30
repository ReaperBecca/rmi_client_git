const https = require('https');
const os = require('os');
const path = require('path');
const fs = require('fs');

const WINDOW_JS_URL = 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/window.js';

async function fetchSubdirConfig() {
    const subdirUrl = 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/subdir.json';
    
    return new Promise((resolve) => {
        https.get(subdirUrl, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    let config = JSON.parse(data);
                    config = replaceAppDataPlaceholder(config);
                    resolve(config);
                } catch {
                    resolve(getDefaultConfig());
                }
            });
        }).on('error', () => {
            resolve(getDefaultConfig());
        });
    });
}

function replaceAppDataPlaceholder(config) {
    const appDataPath = getAppDataPath();

    for (const key in config.app_domain) {
        if (config.app_domain[key].includes('%AppData%')) {
            config.app_domain[key] = config.app_domain[key].replace('%AppData%', appDataPath);
        }
    }

    return config;
}

function getAppDataPath() {
    const homeDir = os.homedir();
    switch (os.platform()) {
        case 'win32':
            return process.env.APPDATA;
        case 'darwin':
            return path.join(homeDir, 'Library', 'Application Support');
        case 'linux':
            return path.join(homeDir, '.local', 'share');
        default:
            throw new Error('Unsupported platform');
    }
}

function getDefaultConfig() {
    return {
        protocol: {
            "reaper://": "https://raw.githubusercontent.com/ReaperBecca/",
            "app://": "%AppData%/ReaperMediaIndustries/"
        },
        app_domain: {
            "reaper://media.ind/": "reaper://rmi_client_git/refs/heads/main/",
            "app://media.ind/": "app://RMI_Client/"
        },
        pages: {
            Home: { Default: "Home/", Themes: "Themes/" },
            Game: { Default: "Games/", Themes: "Themes/" },
            About: { Default: "About/", Themes: "Themes/" },
            Account: { Default: "Account/", Themes: "Themes/" }
        }
    };
}
function buildPageUrl(config, pageKey) {
    const pageConfig = config.pages[pageKey];
    if (!pageConfig || !pageConfig.Default) {
        return 'about:blank';
    }

    const protocol = config.protocol["reaper://"];
    const domain = config.app_domain["reaper://media.ind/"];
    
    return `${protocol}${domain}${pageConfig.Default}`;
}
function initializeAppData() {
    const appDataPath = getAppDataPath();
    const fullAppDataPath = path.join(appDataPath, 'ReaperMediaIndustries');

    if (!fs.existsSync(fullAppDataPath)) {
        fs.mkdirSync(fullAppDataPath, { recursive: true });
    }

    return fullAppDataPath;
}

module.exports = {
    fetchSubdirConfig,
    buildPageUrl,
    initializeAppData,
    WINDOW_JS_URL // Export the constant for use in other modules
};