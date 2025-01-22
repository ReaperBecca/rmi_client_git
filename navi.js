class Navigation {
    constructor() {
        this.buttons = {
            homeButton: '/Pages/home.html',
            gamesButton: '/Pages/games.html',
            aboutButton: '/Pages/about.html',
            accountButton: '/Pages/account.html'
        };
        this.initializeNavigation();
        this.setActiveButton('homeButton'); // Set home as default active
    }

    initializeNavigation() {
        Object.entries(this.buttons).forEach(([buttonId, path]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.setActiveButton(buttonId);
                    window.location.href = path;
                });
            }
        });
    }

    setActiveButton(activeId) {
        // Remove active class from all buttons
        Object.keys(this.buttons).forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.classList.remove('active');
            }
        });
        // Add active class to clicked button
        const activeButton = document.getElementById(activeId);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
