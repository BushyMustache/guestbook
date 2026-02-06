document.getElementById("contact-form").onsubmit = () => {

    clearErrors();

    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "inline-block";
        isValid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "inline-block";
        isValid = false;
    }

    let job = document.getElementById("job").value.trim();
    if (!job) {
        document.getElementById("err-job").style.display = "inline-block";
        isValid = false;
    }

    let url = document.getElementById("url").value;
    if (url != "" && !url.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-url").style.display = "inline-block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if (mail.checked && !email) {
        document.getElementById("err-email").style.display = "inline-block";
        document.getElementById("err-email").textContent = "email is required";
        isValid = false;
    } else if (mail.checked && email != "" && !email.includes("@") && !email.includes(".")) {
        document.getElementById("err-email").style.display = "inline-block";
        document.getElementById("err-email").textContent = "missing @ and .";
        isValid = false;
    } else if (mail.checked && email != "" && validateEmail(email) == false) {
        document.getElementById("err-email").style.display = "inline-block";
        document.getElementById("err-email").textContent = "email isn't valid";
        isValid = false;
    }

    let meet = document.getElementById("meet").value.trim();
    if (meet == "none") {
        document.getElementById("err-meet").style.display = "inline-block";
        isValid = false;
    }

    if (meet == "other") {
        let other = document.getElementById("other").value.trim();
        if (!other) {
            document.getElementById("err-other").style.display = "inline-block";
            isValid = false;
        }
    }

    let html = document.getElementById("html");
    let text = document.getElementById("text");
    if (!html.checked && !text.checked) {
        document.getElementById("err-format").style.display = "inline-block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

function validateEmail(email) {
    emailValid = false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
        emailValid = true;
    } else {
        emailValid = false;
    }
    return emailValid;
}

function mailChecked() {
    const checkbox = document.getElementById("mail");
    const emailSection = document.getElementById("email-section");
    document.getElementById("err-email").style.display = "none";

    if (checkbox.checked == true) {
        emailSection.style.display = "block";
    } else {
        emailSection.style.display = "none";
    }
}

function otherSelected() {
    const meetList = document.getElementById("meet");
    const otherSection = document.getElementById("other-section")
    document.getElementById("err-other").style.display = "none";

    if (meetList.value == "other") {
        otherSection.style.display = "block";
        document.getElementById("err-meet").style.display = "none";
    } else {
        otherSection.style.display = "none"
    }
}