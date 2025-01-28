import { ReaperNavigator } from "./reaper";

class Navigation {
    constructor() {
        this.reaperNavigator = new ReaperNavigator();
        this.contentFrame = document.getElementById('contentFrame');
        this.omniboxInput = document.getElementById('omniboxInput');

        const defaultUrl = this.reaperNavigator.getDefaultUrl();
        this.omniboxInput.value = defaultUrl;
        this.updateContentFrame(defaultUrl);

        this.omniboxInput.addEventListener('input', this.handleOmniboxInput.bind(this));
        this.omniboxInput.value = defaultUrl;
        this.updateContentFrame(defaultUrl);

        this.omniboxInput.addEventListener('input', this.handleOmniboxInput.bind(this));
    }

    handleOmniboxInput(event) {
        const url = event.target.value;
        const result = this.reaperNavigator.handleReaperUrl(url);
        
        if (result) {
            this.updateContentFrame(url);
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
