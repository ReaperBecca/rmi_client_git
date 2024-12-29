document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const buttons = {
        homeButton: document.getElementById('homeButton'),
        gamesButton: document.getElementById('gamesButton'),
        aboutButton: document.getElementById('aboutButton'),
        accountButton: document.getElementById('accountButton')
    };

    // Set up button click handlers
    buttons.homeButton.addEventListener('click', () => {
        window.location.href = '../Home/home.html';
    });

    buttons.gamesButton.addEventListener('click', () => {
        window.location.href = '../Games/games.html';
    });

    buttons.aboutButton.addEventListener('click', () => {
        window.location.href = '../About/about.html';
    });

    buttons.accountButton.addEventListener('click', () => {
        window.location.href = '../Account/account.html';
    });
});
