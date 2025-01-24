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
        
        // initialize navigation
        this.initializeNavigation();

        // set initial state
        const  defaultUrl = 'Reaper://Media.ind/home'
        this.omniboxInput.value = defaultUrl;
        this.updateContentFrame(defaultUrl);
        this.setActiveButton('homeButton');

        // Omnibox event listener
        this.omniboxInput.addEventListener('input', this.handleOmniboxInput.bind(this));
    }

    initializeNavigation() {
        Object.entries(this.buttons).forEach(([buttonId, reaperUrl]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.setActiveButton(buttonId);
                    this.omniboxInput.value = reaperUrl;
                    this.updateContentFrame(reaperUrl);
                });
            }
        });
    }

    setActiveButton(activeId) {
        // Remove 'active' class from all buttons
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
                this.updateContentFrame = result;

                const activeButton = Object.keys(this.buttons).find(
                    (buttonId) => this.buttons[buttonId] === url
                );

                if (activeButton) {
                    this.setActiveButton(activeButton); // Set the button as active
                    } else {
                        this.setActiveButton('homeButton'); // Default to home button if no match
                    }
            } else {
                console.warn(`Unknown Reaper URL: ${url}`);
                }
            }
        }

        updateContentFrame(reaperUrl) {
            const result = handleReaperUrl(reaperUrl);
            if (result) {
                this.contentFrame.src = result;
            } else {
                console.warn(`Unknown Reaper URL: ${reaperUrl}`);
            }
        }
}


document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
