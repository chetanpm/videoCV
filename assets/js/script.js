document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.immersive-video');
    const controls = document.querySelector('.video-controls');
    const playPauseBtn = document.querySelector('.play-pause');
    const bigPlayBtn = document.querySelector('.big-play-btn');
    const seekSlider = document.querySelector('.seek-slider');
    const videoContainer = document.querySelector('.video-container');
    let controlsTimeout;

    // Initialize captions
    const textTracks = video.textTracks[0];
    textTracks.mode = 'showing';

    // Initialize controls visibility
    const hideControls = () => controls.classList.add('hidden');
    const showControls = () => {
        controls.classList.remove('hidden');
        resetControlsTimeout();
    };

    const resetControlsTimeout = () => {
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(hideControls, 1500);
    };

    // Play/Pause functionality
    const togglePlay = () => {
        if (video.paused) {
            video.play();
            bigPlayBtn.style.display = 'none';
        } else {
            video.pause();
            bigPlayBtn.style.display = 'flex';
        }
    };
    
    const infoCard = document.querySelector('.info-card');
    const infoIndicator = document.querySelector('.info-indicator');
    
    infoIndicator.addEventListener('click', () => {
        infoCard.classList.toggle('visible');
    });
    
    // Event listeners
    bigPlayBtn.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
        resetControlsTimeout();
    });

    video.addEventListener('pause', () => {
        showControls();
    });

    videoContainer.addEventListener('mousemove', () => {
        if (!video.paused) showControls();
    });

    // Seek functionality
    seekSlider.addEventListener('input', (e) => {
        video.currentTime = (e.target.value / 100) * video.duration;
    });

    video.addEventListener('timeupdate', () => {
        seekSlider.value = (video.currentTime / video.duration) * 100;
    });

    // Initial controls timeout
    resetControlsTimeout();
});