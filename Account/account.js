document.addEventListener('DOMContentLoaded', () => {
    const buttons = {
        homeButton: '../Home/home.html',
        gamesButton: '../Games/games.html',
        aboutButton: '../About/about.html',
        accountButton: '../Account/account.html'
    };

    Object.entries(buttons).forEach(([buttonId, path]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = path;
            });
        }
    });
});
