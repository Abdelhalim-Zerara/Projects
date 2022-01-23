const domElements = {
    newQuoteButton: document.getElementById("new-quote-button"),
    twitterButton: document.getElementById("twitter-button"),
    quoteText: document.getElementsByClassName("quote-text")[0],
    quoteAuthor: document.getElementsByClassName("quote-author")[0]
}


async function newQuote() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();
    return data;
}

async function displayQuote() {
    const quoteWrapper = document.getElementsByClassName("quote")[0];
    try {
        quoteWrapper.innerHTML = `<div class="quote-text">Loading...</div>`;
        const data = await newQuote();
        quoteWrapper.innerHTML = `
            <div class="quote-text"><i class="fas fa-quote-left double-quotes"></i>
            ${data.quoteText}
            </div>
            <div class="quote-author">${data.quoteAuthor}</div>
    `;
    }
    catch {
        quoteWrapper.innerHTML = `<div class="quote-text">Error :( Try again</div>`;
    }
}


function tweetQuote() {
    const quote = domElements.quoteText.innerText;
    const author = domElements.quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function addEventlisteners() {
    domElements.newQuoteButton.addEventListener("click", displayQuote);
    domElements.twitterButton.addEventListener("click", tweetQuote);
}


(() => {
    window.addEventListener('load', displayQuote);
    addEventlisteners();
    console.log(domElements.twitterButton)
})();