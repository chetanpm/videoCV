document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.immersive-video');
    const controls = document.querySelector('.video-controls');
    const playPauseBtn = controls.querySelector('.play-pause');
    const volumeBtn = controls.querySelector('.volume-btn');
    const volumeSlider = controls.querySelector('.volume-slider');
    const ccBtn = controls.querySelector('.cc-btn');
    const textTracks = video.textTracks[0];
    
    // Initialize
    video.volume = 0.5;
    volumeSlider.value = 0.5;
    textTracks.mode = 'hidden';

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            controls.classList.add('playing');
        } else {
            video.pause();
            controls.classList.remove('playing');
        }
    });

    // Update play/pause state
    video.addEventListener('play', () => {
        controls.classList.add('playing');
        controls.style.opacity = '0';
    });

    video.addEventListener('pause', () => {
        controls.classList.remove('playing');
        controls.style.opacity = '1';
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        video.volume = e.target.value;
        video.muted = e.target.value === '0';
    });

    // Mute button
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        volumeBtn.classList.toggle('muted', video.muted);
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const video = document.getElementById("cvVideo");
    
        // Enable subtitles by default
        const tracks = video.textTracks;
        if (tracks.length > 0) {
            tracks[0].mode = "showing"; // "showing" makes the captions visible
        }
    });

    // CC toggle
    ccBtn.addEventListener('click', () => {
        textTracks.mode = textTracks.mode === 'showing' ? 'hidden' : 'showing';
        ccBtn.classList.toggle('active');
    });

    // Auto-hide controls when playing
    video.addEventListener('mousemove', () => {
        if (!video.paused) {
            controls.style.opacity = '1';
            setTimeout(() => {
                if (!video.paused) controls.style.opacity = '0';
            }, 2000);
        }
    });
});