
let players = [];
const overlay = document.getElementById('overlay');

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.video-container').forEach((container, index) => {
        const videoId = container.getAttribute('data-video-id');
        const iframeId = `player-${index}`;

        // Add iframe dynamically
        container.innerHTML = `
            <iframe id="${iframeId}" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
        `;

        // Create player
        const player = new YT.Player(iframeId, {
            events: { 'onStateChange': (e) => onPlayerStateChange(e, container) }
        });
        players.push(player);
    });
}

function onPlayerStateChange(event, container) {
    if (event.data === YT.PlayerState.PLAYING) {
        // Pause all other videos
        players.forEach(p => {
            if (p !== event.target) p.pauseVideo();
        });

        // Show overlay + cinema mode
        overlay.style.opacity = '1';
        container.classList.add('cinema-mode', 'cinema-mode-start');
        setTimeout(() => container.classList.remove('cinema-mode-start'), 10);

    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        overlay.style.opacity = '0';
        container.classList.add('cinema-mode-start');
        setTimeout(() => container.classList.remove('cinema-mode', 'cinema-mode-start'), 600);
    }
}
