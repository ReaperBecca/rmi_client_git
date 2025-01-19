const fs = require('fs');
const path = require('path');
const { createGameWindow } = require('../window.js');
const { ipcRenderer } = require('electron');
const { initializeGameDirectories, findGameInfoFiles } = require('../preloader.js');

let currentView = 'list';
let currentGameType = 'native';
let gamesList = [];

document.addEventListener('DOMContentLoaded', () => {
    // Load games initially
    loadGames();
    
    // Set up view toggles
    setupViewToggles();
    
    // Set up game type toggles
    setupGameTypeToggles();
    
    // Set up search functionality
    setupSearch();
    
    // Set up navigation
    setupNavigation();
});

function loadGames() {
    gamesList = findGameInfoFiles();
    displayGames(gamesList);
}

function displayGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.innerHTML += gameCard;
    });
    
    // Add click handlers after rendering
    addGameClickHandlers();
}

function createGameCard(game) {
    return `
        <div class="game-card" data-game-id="${game.path}">
            <img src="${game.thumbnail || 'default-thumbnail.png'}" alt="${game.Name}" class="game-thumbnail">
            <div class="game-info">
                <h2 class="game-title">${game.Name}</h2>
                <div class="game-stats-container">
                    <div class="game-stats">
                        <span>Version: ${game.Version}</span>
                        <span>Status: ${game.Completion}</span>
                        <span>Players: ${game.Players}</span>
                        <span>Genre: ${game.Genre.join(', ')}</span>
                        <span>Released: ${game.ReleaseDate}</span>
                    </div>
                    <div class="game-description">
                        ${game.Desc.join(' ')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupViewToggles() {
    const listViewBtn = document.getElementById('listViewButton');
    const gridViewBtn = document.getElementById('gridViewButton');
    const gamesGrid = document.getElementById('gamesGrid');
    
    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        gamesGrid.className = 'games-grid list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        gamesGrid.className = 'games-grid grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
}

function setupGameTypeToggles() {
    const buttons = {
        nativeGamesButton: 'native',
        thirdPartyButton: 'thirdParty',
        gameJamButton: 'gameJam'
    };
    
    Object.entries(buttons).forEach(([buttonId, type]) => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            currentGameType = type;
            // Update active states
            Object.keys(buttons).forEach(id => {
                document.getElementById(id).classList.remove('active');
            });
            button.classList.add('active');
            // Filter and display games
            const filteredGames = filterGamesByType(gamesList, type);
            displayGames(filteredGames);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('gameSearch');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = gamesList.filter(game => 
            game.Name.toLowerCase().includes(searchTerm) ||
            game.Genre.some(genre => genre.toLowerCase().includes(searchTerm)) ||
            game.Desc.some(desc => desc.toLowerCase().includes(searchTerm))
        );
        displayGames(filteredGames);
    });
}

function addGameClickHandlers() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gamePath = card.dataset.gameId;
            const startPath = path.join(gamePath, 'www', 'index.html');
            createGameWindow(path.basename(gamePath), startPath);
        });
    });
}

function setupNavigation() {
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
}

function filterGamesByType(games, type) {
    return games.filter(game => game.directoryType === type);
}
