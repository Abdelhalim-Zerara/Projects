const music = document.getElementsByTagName("audio")[0];
const albumimage = document.getElementsByClassName("album-image ")[0];
const songDetails = document.getElementsByClassName("song-details")[0];
const playButton = document.getElementsByClassName("play-button")[0];
const nextButton = document.getElementsByClassName("next-button")[0];
const lastButton = document.getElementsByClassName("last-button")[0];
const progressBar = document.getElementsByClassName("progress-bar")[0];
const progressLevel = document.getElementsByClassName("progress-level")[0];
const currentTime = document.getElementsByClassName("current-time")[0];
const totalTime = document.getElementsByClassName("total-time")[0];
let currentMusicIndex = 0;

const musicList = [
    {
        title: "Clocks",
        artist: "Coldplay",
        album: "A Rush of Blood to the Head",
    },
    {
        title: "Bitter Sweet Symphony",
        artist: "The Verve",
        album: "Urban Hymns",
    },
    {
        title: "Rolled Together",
        artist: "The Antlers ",
        album: "Burst Apart",
    }
]

function changeMusic(direction) {
    currentMusicIndex += direction;

    if (currentMusicIndex > musicList.length - 1)
        currentMusicIndex = 0;
    else if (currentMusicIndex < 0)
        currentMusicIndex = musicList.length - 1;

    displayMusic();
}

function displayMusic() {
    const song = musicList[currentMusicIndex];
    albumimage.innerHTML = `<img src="img/${song.album}.jpg" alt="${song.album}">`
    songDetails.innerHTML = ` 
    <span class="song-title">${song.title}</span>
    <span class="song-artist">${song.artist}</span>`
    music.setAttribute("src", `audio/${song.title}.mp3`)
    playSong();
}

function playSong() {
    music.paused ? music.play() : music.pause();
}

function calculateProgress() {
    width = Number(getComputedStyle(progressBar).width.split("px")[0]);
    return music.currentTime / music.duration * width;

}

function calculateTime(Time) {
    let time = Math.round(Time);
    let minutes = 0,
        seconds = 0;
    while (time >= 60) {
        minutes++;
        time -= 60;
    }
    seconds = time < 10 ? `0${time}` : time;
    return `${minutes}:${seconds}`
}

function updateProgress() {
    const width = calculateProgress();
    progressLevel.style.setProperty("width", `${width}px`);
    currentTime.innerText = calculateTime(music.currentTime);

}

function changeTime(event) {
    width = Number(getComputedStyle(progressBar).width.split("px")[0]);
    music.currentTime = event.offsetX / width * music.duration;
    updateProgress();
}

function updateTotalTime() {
    totalTime.innerText = calculateTime(music.duration);
}

function addEventListeners() {
    playButton.addEventListener("click", playSong);
    nextButton.addEventListener("click", () => { changeMusic(1) })
    lastButton.addEventListener("click", () => { changeMusic(0) })
    lastButton.addEventListener("dblclick", () => { changeMusic(-1) })
    music.addEventListener("timeupdate", updateProgress);
    music.addEventListener("loadeddata", updateTotalTime);
    progressBar.addEventListener("click", changeTime);

}

window.addEventListener("load", () => {
    displayMusic();
    addEventListeners();
})
