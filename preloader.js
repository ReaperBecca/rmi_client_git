const https = require('https');

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
                    const config = JSON.parse(data);
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

function getDefaultConfig() {
    return {
        protocol: { "reaper://": { Value: "" } },
        app_domain: { "media.ind/": { Value: "" } },
        Home: { Default: "", local: null },
        Game: { Default: "", local: null },
        About: { Default: "", local: null },
        Account: { Default: "", local: null }
    };
}

function buildPageUrl(config, pageKey) {
    const pageConfig = config.pages[pageKey];
    if (!pageConfig || !pageConfig.Default) {
        return 'about:blank';
    }

    const baseUrl = `${config.protoocol["reaper://"].Value}${config.app_domain["media.ind/"].Value}`;
    return `${baseUrl}${pageConfig.Default}`;
}

module.exports = {
    fetchSubdirConfig,
    buildPageUrl
};
