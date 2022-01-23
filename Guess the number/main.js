window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
window.SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;

const messageWrapper = document.querySelector(".msg");


const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

let randomNumber;

function startGame() {
    randomNumber = Math.ceil(Math.random() * 100);
    startRecognition();
}

function startRecognition() {
    recognition.start();
}

function stopRecognition() {
    recognition.stop();
}

function getResult(event) {
    stopRecognition();
    const result = event.results[0][0].transcript;
    console.log(result)
    if ((NanCheck(result))) {
        displayResult(result, "GIVE A VALID NUMBER");
        setTimeout(startRecognition, 1000);
    }
    else {
        if (compareNumber(Number(result)))
            setTimeout(startRecognition, 1000);
    }

};

function NanCheck(numStr) {
    return (Number.isNaN(Number(numStr)));
}

function compareNumber(num) {
    if (num === randomNumber) {
        displayResult(num, "YOU GOT IT")
        setTimeout(finishGame, 0);
        return 0;
    }
    num > randomNumber ? displayResult(num, "GO LOWER") : displayResult(num, "HIGHER");
    return 1;
}

function displayResult(speech, tip) {
    messageWrapper.innerHTML = `
   <span>You Said: ${speech}</span>
    <span>${tip}</span>`
}

function finishGame() {
    alert("YOU WON! Refresh to replay")
}



recognition.addEventListener("result", getResult);
window.addEventListener("load", startGame)