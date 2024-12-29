const fs = require('fs');
const path = require('path');

function scanForGames(baseDir) {
    const games = [];
    const directories = fs.readdirSync(baseDir);

    directories.forEach(dir => {
        const fullPath = path.join(baseDir, dir);
        if (fs.statSync(fullPath).isDirectory()) {
            const hasInfo = fs.existsSync(path.join(fullPath, 'info.json'));

            if (hasInfo) {
                const gameInfo = JSON.parse(fs.readFileSync(path.join(fullPath, 'info.json')));
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

// Expose the scanForGames function to the renderer process
window.scanForGames = scanForGames;