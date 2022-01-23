const jokeButton = document.getElementsByClassName("joke-button")[0];
const synth = window.speechSynthesis;
let voice;


async function getJoke() {
    const apiURL = "https://v2.jokeapi.dev/joke/Programming";
    const res = await fetch(apiURL);
    const data = await res.json();
    return data;
}

async function tellJoke() {
    if (!synth.speaking) {
        const jokeDetails = await getJoke();
        console.log(jokeDetails)
        const speakText = jokeDetails.joke ?
            new SpeechSynthesisUtterance(jokeDetails.joke) :
            new SpeechSynthesisUtterance(`${jokeDetails.setup}.
        ${jokeDetails.delivery}
        `);

        speakText.voice = voice;
        synth.speak(speakText);
    } else
        alert("Wait until the joke ends");

}

function getVoices() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}

function setVoice(voices) {
    for (let voice of voices) {
        if (voice.lang.includes("en")) {
            console.log(voice)
            return voice;
        }
    }
}


window.addEventListener("load", () => {
    jokeButton.addEventListener('click', tellJoke);
    getVoices().then(res => { voice = setVoice(res) });
})