export function validateForm(data) {
    console.log(data);

    const errors = [];

    if (data.fname.trim() == "") {
        errors.push("First name is required");
    }

    if (data.lname.trim() == "") {
        errors.push("Last name is required");
    }

    if (data.job.trim() == "") {
        errors.push("Job is required");
    }

    if (data.url != "" && !data.url.startsWith("https://linkedin.com/in/")) {
        errors.push("LinkedIn URL is not valid");
    }

    if (data.meet == "none") {
        errors.push("How you met is required");
    }

    if (data.meet == "other" && data.other.trim() == "") {
        errors.push("Other is required if you selected other");
    }

    if (data.mail == "on") {
        if (data.email.trim() == "") {
            errors.push("Email is required");
        }
        
        const validFormats = ['html', 'text'];
        if (!validFormats.includes(data.format)) {
            errors.push("Format is invalid");
        }
    }

    console.log(errors);

    return {
        isValid: errors.length === 0,
        errors
    };
}