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

    async loadNavigationStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        const cssContent = await window.electron.invoke('get-local-file', 'Themes/Reaper\'sDarkMode/navi.css');
        const cssUrl = 'data:text/css;charset=UTF-8,' + encodeURIComponent(cssContent);
        link.href = cssUrl;
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