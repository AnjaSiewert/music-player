const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audioElement = document.querySelector('audio');
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

previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);