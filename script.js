const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audioElement = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const previousButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-4',
        displayName: 'Front Row(Remix)',
        artist: 'Metric/Jacinto Design',
    }
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    audioElement.play();
};

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    audioElement.pause();
};

playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audioElement.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

let songIndex = 0;

function prevSong () {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    };
    loadSong(songs[songIndex]);
    playSong();
};

function nextSong () {
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};

loadSong(songs[songIndex]);

function updateProgressBar(event){
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log(durationMinutes, durationSeconds);
        
        if(durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    };
};

previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audioElement.addEventListener('timeupdate', updateProgressBar);