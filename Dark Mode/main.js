const darkModeButton = document.querySelector(".button");

function darkMode() {
    const elemnents = Array.from(document.body.getElementsByTagName("*"));
    elemnents.forEach(element => {
        if (element.nodeName !== "SCRIPT")
            element.classList.toggle("dark");
    });
    document.body.classList.toggle("dark");
}

darkModeButton.addEventListener("click", darkMode);