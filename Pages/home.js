document.addEventListener('DOMContentLoaded', () => {
    const gamesGrid = document.getElementById('gamesGrid');
    const newsContainer = document.getElementById('newsContainer');

    // Example function to populate games
    function populateGames() {
        const games = [
            { title: 'Game 1', description: 'Description for game 1' },
            { title: 'Game 2', description: 'Description for game 2' },
            // Add more games as needed
        ];

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `<h3>${game.title}</h3><p>${game.description}</p>`;
            gamesGrid.appendChild(gameCard);
        });
    }

    // Example function to populate news
    function populateNews() {
        const newsItems = [
            { title: 'News 1', content: 'Content for news 1' },
            { title: 'News 2', content: 'Content for news 2' },
            // Add more news items as needed
        ];

        newsItems.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `<h4>${news.title}</h4><p>${news.content}</p>`;
            newsContainer.appendChild(newsItem);
        });
    }

    // Call the functions to populate the page
    populateGames();
    populateNews();
});
