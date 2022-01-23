const player = document.getElementsByClassName("wrapper")[0];
const video = document.getElementsByTagName("video")[0];
const playButton = document.getElementsByClassName("play-button")[0];
const progressBar = document.getElementsByClassName("progress-bar")[0];
const progressLevel = document.getElementsByClassName("progress-level")[0];
const volumeBar = document.getElementsByClassName("volume-bar")[0];
const volumeLevel = document.getElementsByClassName("volume-level")[0];
const Timeline = document.getElementsByClassName("timeline")[0];
const volumeButton = document.getElementsByClassName("volume-button")[0];
const fullScreenButton = document.getElementsByClassName("fullscreen-button button")[0];
const speedMenu = document.getElementsByClassName("speed-menu")[0];
const currentTime = document.getElementsByClassName("current-time")[0];
const totalTime = document.getElementsByClassName("total-time")[0];

let onFullScreen = false;

function playVideo() {
    video.paused ? video.play() : video.pause();
}

function muteVideo() {
    if (video.muted) {
        video.muted = false;
        volumeButton.style.setProperty("text-decoration", "none");
    }
    else {
        video.muted = true;
        volumeButton.style.setProperty("text-decoration", "line-through");
    }
}

function updateTime(wrapper, time) {
    wrapper.innerText = calculateTime(time);
}

function getWidth(bar) {
    width = Number(getComputedStyle(bar).width.split("px")[0]);
    return width;
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

function updateLevel(level, position, max) {
    level.style.setProperty("width", `${position / max * 100}%`);
}

function changeTime(event) {
    const width = getWidth(progressBar);
    video.currentTime = event.offsetX / width * video.duration;
    updateLevel(progressLevel, video.currentTime, video.duration);
}

function changeVolume(event) {
    const width = getWidth(volumeBar);
    video.volume = event.offsetX / width;
    updateLevel(volumeLevel, video.volume, 1);
}

function changeSpeed() {
    video.playbackRate = Number(speedMenu.value);
}

function fullScreen() {
    if (!onFullScreen)
        player.requestFullscreen();
    else
        document.exitFullscreen();
    onFullScreen = !onFullScreen;


}

function addEventListeners() {
    playButton.addEventListener("click", playVideo);
    volumeButton.addEventListener("click", muteVideo);
    fullScreenButton.addEventListener("click", fullScreen);
    progressBar.addEventListener("click", changeTime);
    volumeBar.addEventListener("click", changeVolume);
    speedMenu.addEventListener("change", changeSpeed);
    video.addEventListener("timeupdate", function () {
        updateLevel(
            progressLevel,
            video.currentTime,
            video.duration
        );
        updateTime(currentTime, video.currentTime)
    }
    );
}


window.addEventListener("load", function () {
    addEventListeners();
    updateTime(totalTime, video.duration);
    playVideo();
})