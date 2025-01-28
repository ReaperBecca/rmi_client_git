import { ReaperNavigator } from "./reaper";

class Navigation {
    constructor() {
        this.reaperNavigator = new ReaperNavigator();
        this.buttons = {
            homeButton: 'Reaper://Media.ind/Home',
            gamesButton: 'Reaper://Media.ind/Games',
            aboutButton: 'Reaper://Media.ind/About',
            accountButton: 'Reaper://Media.ind/Account'
        };
        
        this.contentFrame = document.getElementById('contentFrame');
        this.omniboxInput = document.getElementById('omniboxInput');
        
        this.initializeNavigation();

        const defaultUrl = this.reaperNavigator.getDefaultUrl();
        this.omniboxInput.value = defaultUrl;
        this.updateContentFrame(defaultUrl);
        this.setActiveButton('homeButton');

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
        const result = this.reaperNavigator.handleReaperUrl(url);
        
        if (result) {
            this.updateContentFrame(url);
            const activeButton = Object.entries(this.buttons)
                .find(([_, value]) => value === url)?.[0];
            
            if (activeButton) {
                this.setActiveButton(activeButton);
            }
        }
    }

    updateContentFrame(reaperUrl) {
        const result = this.reaperNavigator.handleReaperUrl(reaperUrl);
        if (result) {
            this.contentFrame.src = result;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
