const boxes = Array.from(document.querySelectorAll(".wrapper div"));
let image = document.querySelector("img");
let selectedBox;


function addClass(element, className) {
    element.classList.add(className);
}
function removeClass(element, className) {
    element.classList.remove(className);
}

function getFilledBox() {
    return document.querySelector(".filled");
}

function switchBoxes(oldBox, newBox) {
    addClass(oldBox, "empty");
    removeClass(oldBox, "filled");
    oldBox.innerHTML = "";
    addClass(newBox, "filled");
    removeClass(newBox, "empty");
    newBox.innerHTML = `<img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
    draggable="true">`

}

function dropImage() {
    if (selectedBox.classList.contains("empty")) {
        filledBox = getFilledBox();
        switchBoxes(filledBox, selectedBox);
        removeClass(selectedBox, "active");

    }
}


function addEvents() {
    boxes.forEach(box => {
        box.addEventListener("dragenter", function (event) {
            event.preventDefault();
            selectedBox = this;

        });
        box.addEventListener("dragleave", function () {
            removeClass(this, "active");
            selectedBox = document.querySelector(".filled");

        });
        box.addEventListener("dragover", function (event) {
            event.preventDefault();
            addClass(this, "active");
        })
        box.addEventListener("dragend", function (event) {
            removeClass(this, "active");
        })
        box.addEventListener("drop", dropImage)
    });

    image.addEventListener("dragstart", function () {
        addClass(this, "invisible")

    });
    image.addEventListener("dragend", function () {
        removeClass(this, "invisible")

    });
}

window.addEventListener("load", () => {
    addEvents();
});