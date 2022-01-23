const timeDOM = {
    days: document.getElementsByClassName("days")[0],
    hours: document.getElementsByClassName("hours")[0],
    minutes: document.getElementsByClassName("minutes")[0],
    seconds: document.getElementsByClassName("seconds")[0],
}

const form = document.querySelector("form");
const title = document.querySelector(".title");
const countdownDiv = document.querySelector(".countdown");
const titleInput = document.querySelector(".title-input input");
const dateInput = document.querySelector(".date-input input");
const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");

const secsInDay = 86400;
const secsInHour = 3600;
const secsInMinute = 60;

let countDate;
let count;


function toggleDiv(div) {
    div.classList.toggle("hidden");
}

function switchDivs(div1, div2) {
    toggleDiv(div1);
    toggleDiv(div2)
}

function getCurrentTime() {
    return Date.now();
}


function getTime(date) {
    return date.getTime();
}

function msToSeconds(time) {
    return time / 1000;
}

function getUnit(size) {
    return function (time) {
        let unit = 0;
        while (time >= size) {
            time -= size;
            unit++;
        }
        return unit;
    }
}

const getDays = getUnit(secsInDay);
const getHours = getUnit(secsInHour);
const getMinutes = getUnit(secsInMinute);

function substractTime(size) {
    return function (time, reps) {
        return time - reps * size;
    }
}

const substractDays = substractTime(secsInDay);
const substractHours = substractTime(secsInHour);
const substractMinutes = substractTime(secsInMinute);

function convertTime(time) {
    let seconds = msToSeconds(time);
    const days = getDays(seconds);
    seconds = substractDays(seconds, days);
    const hours = getHours(seconds);
    seconds = substractHours(seconds, hours);
    const minutes = getMinutes(seconds);
    seconds = substractMinutes(seconds, minutes);
    seconds = Math.round(seconds);
    return {
        days,
        hours,
        minutes,
        seconds
    }
}

function countdown(date) {
    let time = getTime(date) - getCurrentTime();
    if (time >= 0) {
        let countInfos = convertTime(time)
        updateCountDown(countInfos);
    } else {
        stopCountDown()
    }
}

function startCountDown() {
    count = setInterval(countdown, 1000, countDate);
    switchDivs(form, countdownDiv);
}

function stopCountDown() {
    clearInterval(count);
    switchDivs(form, countdownDiv);
}

function updateCountDown(infos) {
    timeDOM.days.innerHTML = infos.days;
    timeDOM.hours.innerHTML = infos.hours;
    timeDOM.minutes.innerHTML = infos.minutes;
    timeDOM.seconds.innerHTML = infos.seconds;
}

function prepareCountDown(event) {
    event.preventDefault();
    if (dateInput.value) {
        countDate = new Date(dateInput.value);
        if (countDate.getTime() > Date.now()) {
            startCountDown()
            updateTitle();
        } else
            showCountdonwError();
    } else
        showCountdonwError();
}

function showCountdonwError() {
    alert("Choose a valid Date");
}

function updateTitle() {
    title.innerHTML = titleInput.value || "Countdown";
}

function addEvents() {
    submitButton.addEventListener("click", prepareCountDown);
    resetButton.addEventListener("click", stopCountDown);
}

window.addEventListener("load", addEvents);