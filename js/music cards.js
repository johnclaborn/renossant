const cards = document.querySelectorAll('.audio-card, .audio-card-mini');

cards.forEach((card, index) => {
    const audio = card.querySelector('audio');
    const playBtn = card.querySelector('.play-btn');
    const wrapper = card.querySelector('.play-btn-wrapper');
    const progressContainer = card.querySelector('.progress-container');
    const progressBar = card.querySelector('.progress-bar');
    const restartBtn = card.querySelector('.restart-btn');
    const timeDisplay = card.querySelector('.time-display');

    // play button
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            cards.forEach((otherCard, i) => {
            const otherAudio = otherCard.querySelector('audio');
            const otherBtn = otherCard.querySelector('.play-btn');
            const otherwrapper = otherCard.querySelector('.play-btn-wrapper');
                if (i !== index) {
                    otherAudio.pause();
                    otherCard.classList.remove('playing');
                    otherwrapper.classList.remove('playing');
                    if (otherBtn) otherBtn.innerHTML = "&#9658;";
                }
            });
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.classList.add('playing');
            wrapper.classList.add('playing');
            card.classList.add('playing');
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.classList.remove('playing');
            wrapper.classList.remove('playing');
            card.classList.remove('playing');
        }
    });

    // restart button
    restartBtn.addEventListener('click', () => {
        audio.currentTime = 0;
    });

    // progress bar update
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + "%";
    });

    // progress bar click
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * audio.duration;
        audio.currentTime = seekTime;
    });

    // time display update
    audio.addEventListener('timeupdate', () => {
        const formatTime = (time) => {
            const mins = Math.floor(time / 60);
            const secs = Math.floor(time % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        };
        if (audio.duration) {
            timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        }
    });

    // after song ends, play next music card
    audio.addEventListener('ended', () => {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove('playing');
        wrapper.classList.remove('playing');
        card.classList.remove('playing');
        progressBar.style.width = "0%";
        // Play next track
        if (index + 1 < cards.length) {
            cards[index + 1].querySelector('.play-btn').click();
        }
    });
});