const bookList = document.getElementsByClassName("books")[0];
const addButoon = document.getElementsByClassName("add-button")[0];
const form = document.getElementsByTagName("form")[0];
const titleInput = document.querySelector(".title-input input");
const linkInput = document.querySelector(".link-input input");
const submitButoon = document.getElementsByClassName("submit-button")[0]
const books = JSON.parse(localStorage.getItem("books")) || [];

function toggleForm() {
    form.classList.toggle("hidden");
}

function hideForm() {
    if (!form.classList.contains("hidden"))
        toggleForm();
}

function showForm() {
    if (form.classList.contains("hidden"))
        toggleForm();

}

function completeLink(link) {
    if (link.trim().length === 0)
        return link;
    if (link.indexOf("www") === -1 && link.indexOf("https://") === -1)
        return "https://www." + link;
    if (link.indexOf("www") === 0 && link.indexOf("https://") === -1)
        return "https://" + link;
    if (link.indexOf("www") === -1 && link.indexOf("https://") === 0) {
        link = link.split("//")[1];
        return "https://www." + link;
    }
    return "";
}

function addBook(title, link) {
    const book = { title, link, icon: null };
    books.push(book)
    saveBooks();
    return book;
}

function removeBook(index) {
    books.splice(index, 1);
    saveBooks();
    return books.length;
}

function removeBookDiv() {
    removeBook(this.dataset.index);
    populateBookList();
}

function resetInputs() {
    titleInput.value = "";
    linkInput.value = "";
}


function displaybook(book, index) {
    bookList.innerHTML += `
    <div class="books">
            <div  class="book" >
                <div class="delete-button" data-index="${index}">
                &#x274C;
                </div>
                <a class="book-title" href="${book.link}">
                    <span>${book.title}</span>
                </a>
            </div>
        </div>
       `
}

function populateBookList() {
    bookList.innerHTML = "";
    books.forEach(displaybook);
    addDeleteEventListners();
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function submitBook() {
    event.preventDefault();
    const title = titleInput.value
    const link = completeLink(linkInput.value);
    addBook(title, link);
    populateBookList();
    hideForm();
    resetInputs();
}

function addDeleteEventListners() {
    const deleteButtons = Array.from(document.getElementsByClassName("delete-button"));
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", removeBookDiv);
    });
}

function addEventListeners() {
    addButoon.addEventListener("click", showForm);
    submitButoon.addEventListener("click", submitBook);

}

window.addEventListener("load", function () {
    addEventListeners();
    populateBookList();
});