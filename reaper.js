export function handleReaperUrl(url) {

    if (url.startsWith('Reaper://')) {
        const path = url.substring('Reaper://'.length);
        
        console.error('Reaper URL: ${url}');
        console.log('Reaper URL path: ${path}');

        return null;
    }

    const path = url.substring('Reaper://'.length);

    console.log('Reaper URL: ${path}');

    const urlMappings = {
        'Media.ind/Home': './Pages/home.html',
        'Media.ind/Games': './Pages/games.html',
        'Media.ind/About': './Pages/about.html',
        'Media.ind/Account': './Pages/account.html'
    };

    if (urlMappings[path]) {
        return urlMappings[path];
    } 

    console.warn('Unhandled Reaper URL: ${path}');
    return null;

}