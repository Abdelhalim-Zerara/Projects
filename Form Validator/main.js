const inputFields = Array.from(document.querySelectorAll(".input-field input"));
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerButton = document.getElementsByClassName("register-button")[0];

const RegularExpressions = {
    fullName: /^([\w]{3,})+\s+([\w\s]{3,})+$/i,
    phoneNumber: /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,

}

function validate(cond, input) {
    if (cond) {
        input.parentElement.classList.add("valid");
        input.parentElement.classList.remove("invalid");
    }
    else {
        input.parentElement.classList.add("invalid");
        input.parentElement.classList.remove("valid");
    }
}

function checkData(e) {
    e.preventDefault();
    let validInputs = [...inputFields].filter(input => {
        return input.parentElement.classList.contains("valid");
    });

    if (!(validInputs.length === inputFields.length)) {
        alert("Fill the form correctly");
    } else
        sendData();
}

function sendData() {
    const data = {}
    inputFields.forEach(input => {
        const name = input.getAttribute("name");
        const value = input.value;
        if (!(name === "confirmPassword"))
            data[name] = value;
    });
    console.log(data);
}

function addEventListeners() {
    inputFields.forEach(input => {
        input.addEventListener("focus", function () {
            this.parentElement.classList.add("active");
        });
        input.addEventListener("focusout", function () {
            if (!input.value) {
                this.parentElement.classList.remove("active");
            }
        });
        input.addEventListener("input", function () {
            const name = this.getAttribute("name");
            if (!(name === "confirmPassword")) {
                validate(RegularExpressions[name].test(this.value), this);
                if (name === "password")
                    validate((this.value === confirmPasswordInput.value), confirmPasswordInput);
            } else {
                validate((this.value === passwordInput.value), this);
            }
        });
    });

    registerButton.addEventListener("click", checkData);
}

window.addEventListener("load", addEventListeners);