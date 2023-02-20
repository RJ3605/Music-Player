const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const audioElement = document.querySelector("audio");
const progessContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevButton = document.querySelector("#prev");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electic Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

// Play/Pause
function playSong() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  audioElement.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  audioElement.pause();
}

// Play/Pause Event Listener
playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audioElement.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Sont
let songIndex = 0;

// Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progess Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update Progress Bar With
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate Display for Duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate Display for Duration
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    if (currentTimeSeconds) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audioElement;
  audioElement.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
audioElement.addEventListener("timeupdate", updateProgressBar);
progessContainer.addEventListener("click", setProgressBar);
audioElement.addEventListener("ended", nextSong);
