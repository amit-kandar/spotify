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

export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedDuration = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedDuration;
};
