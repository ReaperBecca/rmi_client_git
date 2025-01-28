export class ReaperNavigator {
    constructor() {
        this.baseUrl = 'https://reaperbecca.github.io/rmi_client_git/';
        this.reaperPrefix = 'Reaper://Media.ind/';
    }

    handleReaperUrl(url) {
        if (!url.startsWith(this.reaperPrefix)) {
            return null;
        }

        const path = url.substring(this.reaperPrefix.length);
        console.log(`Navigating to: ${path}`);
        return this.baseUrl + path;
    }

    validateUrl(url) {
        return url.startsWith(this.reaperPrefix);
    }

    getDefaultUrl() {
        return this.reaperPrefix;  // Changed to return just the prefix
    }
}