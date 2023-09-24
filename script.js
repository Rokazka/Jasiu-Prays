const audio = document.querySelector('audio');
const playBtn = document.querySelector('.main-button');
const playPrevBtn = document.querySelector('.fa-backward');
const playNextBtn = document.querySelector('.fa-forward');
const image = document.querySelector('img');
const title = document.querySelector('.title');
const autor = document.querySelector('.autor');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

const songs = [{
        name: 'song-1',
        displayName: 'Morning Pray',
        artist: 'Guru Nanak',
    },
    {
        name: 'song-2',
        displayName: 'Wieczorna modlitwa',
        artist: 'Guru Nanak',
    },
];

let isPlaying = false;

function musicPlay() {
    isPlaying = true;
    audio.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

function pausePlay() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    audio.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () =>
    isPlaying ? pausePlay() : musicPlay()
);

function loadSong(song) {
    title.textContent = song.displayName;
    autor.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}
let songIndex = 0;

function playPrev() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    audio.play();
}

function playNext() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    audio.play();
}
// update the progress bar in time

function updateProgressBar(e) {
    if (isPlaying) {
        const time = e.srcElement.currentTime;
        const duration = e.srcElement.duration;
        console.log(duration)
        let progressProcentage = (time / duration) * 100;
        progress.style.width = `${progressProcentage}%`;

        // Updating duration time on disply
        const durationMinutes = Math.floor(duration / 60);
        const durationSecounds = Math.floor(duration % 60);
        if (durationSecounds < 10) {
            durationSecounds = `0${durationSecounds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSecounds) {
            durationEl.textContent = `${durationMinutes}:${durationSecounds}`;
        }
        // Updating Currenttime on disply
        const currentMinutes = Math.floor(time / 60);
        const currentSecounds = Math.floor(time % 60);
        const addingZeroCurrentSecounds = `0${currentSecounds}`;

        currentTimeEl.textContent = `${currentMinutes}:${addingZeroCurrentSecounds}`;
    }
}

function ProgrresBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;

}

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', ProgrresBar);