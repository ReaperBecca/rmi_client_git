class Navigation {
    constructor() {
        this.buttons = {
            homeButton: 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/home.html',
            gamesButton: 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/games.html',
            aboutButton: 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/about.html',
            accountButton: 'https://raw.githubusercontent.com/ReaperBecca/rmi_client_git/refs/heads/main/account.html'
        };
        this.loadNavigationStyles();
        this.initializeNavigation();
    }

    loadNavigationStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './Themes/Reaper\'sDarkMode/navi.css';
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