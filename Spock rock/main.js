class Sign {
    constructor(name, weaknesses) {
        this.name = name;
        this.weaknesses = weaknesses;
    }

    battle(sign) {
        if (this.weaknesses.includes(sign.name))
            return -1;
        else if (this.name === sign.name)
            return 0;
        else
            return 1;
    }

};


let signs = {
    rock: new Sign("Rock", ["Paper", "Spock"]),
    paper: new Sign("Paper", ["Scissors", "Lizard"]),
    scissors: new Sign("Scissors", ["Rock", "Spock"]),
    lizard: new Sign("Lizard", ["Rock", "Scissors"]),
    spock: new Sign("Spock", ["Paper", "Lizard"])
}


const playerSigns = Array.from(document.querySelectorAll(".player span"));
const computerSigns = Array.from(document.querySelectorAll(".computer span"));
const resultWrapper = document.querySelector("h1");


function getRandomSign() {
    let computerSign = computerSigns[Math.floor(Math.random() * 5)];
    selectSign(computerSign);
    return computerSign.dataset.sign;
}

function selectSign(sign) {
    sign.classList.add("selected");
}

function resetSigns() {
    confetti.stop()
    let selectedSigns = Array.from(document.querySelectorAll(".selected"));
    if (selectedSigns)
        selectedSigns.forEach(sign => {
            sign.classList.remove("selected");
        });
}

function displayResult(str) {
    resultWrapper.innerHTML = str;
}

function battle() {
    resetSigns();
    selectSign(this);
    let result = signs[this.dataset.sign].battle(signs[getRandomSign()]);
    switch (result) {
        case -1:
            displayResult("You Lose");
            break;
        case 0:
            displayResult("Tie");
            break;
        default:
            displayResult("You Win");
            confetti.start();
            break;
    }

}

function addEventListeners() {
    playerSigns.forEach(sign => {
        sign.addEventListener("click", battle);
    })
}


window.addEventListener("load", addEventListeners);