  document.addEventListener('DOMContentLoaded', () => {
      // Navigation handling
      const buttons = {
          homeButton: 'home.html',
          gamesButton: 'games.html',
          aboutButton: 'about.html',
          accountButton: 'account.html'
      };

      Object.entries(buttons).forEach(([buttonId, path]) => {
          const button = document.getElementById(buttonId);
          if (button) {
              button.addEventListener('click', () => {
                  window.location.href = path;
              });
          }
      });

      // Keep the rest of your existing code for featured games and news updates
      const featuredGames = [
          { title: 'Arrows Game', description: 'Exciting adventure game' },
          { title: 'Game 2', description: 'Strategic puzzle game' },
          { title: 'Game 3', description: 'Action-packed RPG' }
      ];

      const gamesGrid = document.getElementById('gamesGrid');
      featuredGames.forEach(game => {
          const gameCard = document.createElement('div');
          gameCard.className = 'game-card';
          gameCard.innerHTML = `
              <h3>${game.title}</h3>
              <p>${game.description}</p>
          `;
          gamesGrid.appendChild(gameCard);
      });

      const newsContainer = document.getElementById('newsContainer');
      const newsUpdates = [
          'New game release coming soon!',
          'Check out our latest updates',
          'Community event this weekend'
      ];

      newsUpdates.forEach(news => {
          const newsItem = document.createElement('div');
          newsItem.textContent = news;
          newsContainer.appendChild(newsItem);
      });
  });