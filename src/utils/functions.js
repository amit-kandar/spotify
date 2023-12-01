export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid;
    if (emailRegex.test(email)) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={};:<>|./?,-])[A-Za-z\d!@#$%^&*()_+={};:<>|./?,-]+$/;
    let isValid;
    if (regex.test(password))
        isValid = true;
    else
        isValid = false;

    return isValid;
}