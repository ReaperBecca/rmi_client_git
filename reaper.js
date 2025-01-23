export function handleReaperUrl(url) {

    if (url.startsWith('Reaper://')) {
        const path = url.substring('Reaper://'.length);
        
        console.log('Reaper URL path: ${path}');

        const urlMappings = {
            'Media.ind/Home': './Pages/home.html',
            'Media.ind/Games': './Pages/games.html',
            'Media.ind/About': './Pages/about.html',
            'Media.ind/Account': './Pages/account.html'
        };

        return urlMappings[path] || null;

        return path;
    }

    return null;
}