class Navigation {
    constructor() {
        this.buttons = {
            homeButton: './Pages/home.html',
            gamesButton: './Pages/games.html',
            aboutButton: './Pages/about.html',
            accountButton: './Pages/account.html'
        };
        this.loadNavigationStyles();
        this.initializeNavigation();
    }

    loadNavigationStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${getAppDataPath()}/reapermediaindustries/RMI_Client/Themes/Reaper'sDarkMode/navi.css`;
        document.head.appendChild(link);
    }

    initializeNavigation() {
        Object.entries(this.buttons).forEach(([buttonId, path]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    window.location.href = path;
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});