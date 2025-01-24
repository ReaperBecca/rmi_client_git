import { handleReaperUrl } from "./reaper";

class Navigation {
    constructor() {
        this.buttons = {
            homeButton: 'Reaper://Media.ind/Home',
            gamesButton: 'Reaper://Media.ind/Games',
            aboutButton: 'Reaper://Media.ind/About',
            accountButton: 'Reaper://Media.ind/Account'
        };
        this.contentFrame = document.getElementById('contentFrame');
        this.omniboxInput = document.getElementById('omniboxInput');
        this.omniboxInput.value = 'Reaper://Media.ind/';
        this.initializeNavigation();
        this.setActiveButton('homeButton');
    }

    initializeNavigation() {
        Object.entries(this.buttons).forEach(([buttonId, reaperUrl]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.setActiveButton(buttonId);
                    this.omniboxInput.value = reaperUrl;
                    const result = handleReaperUrl(reaperUrl);
                    if (result) {
                        this.contentFrame.src = result;
                    }
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

    handleOmniboxInput(event) {
        const url = event.target.value;

        if (url.startsWith('Reaper://')) {
            const result = handleReaperUrl(url);
            if (result) {
                this.contentFrame.src = result;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
