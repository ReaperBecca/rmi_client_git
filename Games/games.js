  const fs = require('fs');
  const path = require('path');
  const { createGameWindow } = require('../window.js');

  function scanForGames(baseDir) {
      const games = [];
      const directories = fs.readdirSync(baseDir);

      directories.forEach(dir => {
          const fullPath = path.join(baseDir, dir);
          if (fs.statSync(fullPath).isDirectory()) {
              const hasInfo = fs.existsSync(path.join(fullPath, 'info.json'));

              if (hasInfo) {
                  const gameInfo = JSON.parse(fs.readFileSync(path.join(fullPath, 'info.json')));

                  // Extract the "Start" path from the gameInfo
                  const startPath = gameInfo.Start ? path.join(fullPath, gameInfo.Start) : null;

                  games.push({
                      directory: dir,
                      info: gameInfo,
                      startPath: startPath, // Add the start path to the game object
                      isGame: true
                  });
              }
          }
      });

      return games;
  }
    document.addEventListener('DOMContentLoaded', () => {
        const { ipcRenderer } = require('electron');

        // Navigation handling
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

        const gamesPath = path.join(__dirname);
        const games = window.scanForGames(gamesPath); // Use the function from preload.js
        const gamesGrid = document.getElementById('gamesGrid');
        const listViewButton = document.getElementById('listViewButton');
        const gridViewButton = document.getElementById('gridViewButton');

        listViewButton.addEventListener('click', () => {
            gamesGrid.classList.add('list-view');
            gamesGrid.classList.remove('grid-view');
        });

        gridViewButton.addEventListener('click', () => {
            gamesGrid.classList.add('grid-view');
            gamesGrid.classList.remove('list-view');
        });

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';

            const description = Array.isArray(game.info.Desc) 
                ? game.info.Desc.join('<br>') 
                : game.info.Desc;
      
            gameCard.innerHTML = `
                <div class="game-info">
                    <h3 class="game-title">${game.directory}</h3>
                    <div class="game-stats-container">
                        <div class="game-stats">
                            <span>👥 Players: ${game.info.Players}</span>
                            <span>🏆 Achievements: ${game.info.Achievements}</span>
                        </div>
                        <div class="game-description">${description}</div>
                    </div>
                </div>
            `;
              
            gameCard.addEventListener('click', () => {
                if (game.startPath) {
                    createGameWindow(game.directory, game.startPath); // Pass the start path
                }
            });
            gamesGrid.appendChild(gameCard);
        });

        // Search functionality
        const searchInput = document.getElementById('gameSearch');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');

            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = title.includes(searchTerm) ? 'block' : 'none';
            });
        });
  });