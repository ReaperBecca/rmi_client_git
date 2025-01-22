document.addEventListener('DOMContentLoaded', () => {
    Object.entries(buttons).forEach(([buttonId, path]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = path;
            });
        }
    });
});