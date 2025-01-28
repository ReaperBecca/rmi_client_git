export class ReaperNavigator {
    constructor() {
        this.urlMappings = {
            'Media.ind/Home': './Pages/home.html',
            'Media.ind/Games': './Pages/games.html', 
            'Media.ind/About': './Pages/about.html',
            'Media.ind/Account': './Pages/account.html'
        };
    }

    handleReaperUrl(url) {
        if (!url.startsWith('Reaper://')) {
            return null;
        }

        const path = url.substring('Reaper://'.length);
        console.log(`Navigating to: ${path}`);

        return this.urlMappings[path] || null;
    }

    validateUrl(url) {
        return url.startsWith('Reaper://') && this.urlMappings[url.substring('Reaper://'.length)];
    }

    getDefaultUrl() {
        return 'Reaper://Media.ind/Home';
    }
}