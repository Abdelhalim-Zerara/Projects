const domElements = {
    loader: document.getElementsByClassName("loader-wrapper")[0],
    quotesWrapper: document.getElementsByClassName("quotes-wrapper")[0]
}

const favoirtes = [];


function FethcingPosts() {
    let currentPage = 0;
    return async function (postsCount) {
        currentPage++;
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsCount}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data;
    }
}

const addPosts = FethcingPosts();

function createQuoteDiv(post, index) {
    const quoteDiv = document.createElement("div");
    const favoirtesButton = document.createElement("span");
    quoteDiv.className = "quote";
    quoteDiv.dataset.aos = `fade-${(index % 2) === 0 ? "left" : "right"}`;
    quoteDiv.dataset.aosOnce = "true"
    quoteDiv.innerText = post.body;
    quoteDiv.appendChild(favoirtesButton);
    favoirtesButton.addEventListener("click", addToFavorites.bind(post));
    favoirtesButton.innerHTML = "&#9825;";
    return quoteDiv;
}

async function displayposts(wrapper, postsCount) {
    const posts = await addPosts(postsCount);
    posts.forEach((post, index) => {
        wrapper.appendChild(createQuoteDiv(post, index));
    });
}


function loaderSwitch(loader, className) {
    loader.className = `loader-wrapper ${className}`;
}

function paginatePosts(loader, wrapper, count) {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        loaderSwitch(loader, "")
        displayposts(wrapper, count)
            .then(() => { loaderSwitch(loader, "hidden") });
    }
}

function addToFavorites(event) {
    if (!(event.target.parentElement.classList.contains("favorite"))) {
        event.target.parentElement.classList.add("favorite")
        favoirtes.push(this);
    } else {
        event.target.parentElement.classList.remove("favorite");
        favoirtes.splice(favoirtes.indexOf(this), 1);
    }
}


window.addEventListener("load", function () {
    AOS.init({
        offset: -10,
        duration: 500
    });
    displayposts(domElements.quotesWrapper, 10);
    document.addEventListener("scroll", function () {
        paginatePosts(
            domElements.loader,
            domElements.quotesWrapper,
            5)
    });
});


