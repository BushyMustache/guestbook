document.getElementById("contact-form").onsubmit = () => {

    clearErrors();
    
    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    let job = document.getElementById("job").value.trim();
    if (!job) {
        document.getElementById("err-job").style.display = "block";
        isValid = false;
    }

    let company = document.getElementById("company").value.trim();
    if (!company) {
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }

    let url = document.getElementById("url").value.trim();
    if (!url) {
        document.getElementById("err-url").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    if (!email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    let meet = document.getElementById("meet").value.trim();
    let other = document.getElementById("other").value.trim();
    if (meet == "none" && !other) {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }

    let html = document.getElementById("html");
    let text = document.getElementById("text");
    if (!html.checked && !text.checked) {
        document.getElementById("err-format").style.display = "block";
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