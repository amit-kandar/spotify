import validator from 'validator';

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

export const checkTokenValidity = (token) => {

    const decodedToken = parseJwt(token);

    if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return false;
        } else
            return true;
    } else {
        console.log('Invalid token');
    }
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const showPassword = () => {
    const eye = document.getElementById('eye');
    const passwordInput = document.getElementById('password');

    if (eye.classList.contains('fa-eye-slash')) {
        eye.classList.replace('fa-eye-slash', 'fa-eye');
        passwordInput.type = 'text';
    } else {
        eye.classList.replace('fa-eye', 'fa-eye-slash');
        passwordInput.type = 'password';
    }
};

export const handleToggle = () => {
    const toggle = document.getElementById('toggle');

    if (toggle.classList.contains('fa-toggle-on')) {
        toggle.classList.replace('fa-toggle-on', 'fa-toggle-off');
    } else {
        toggle.classList.replace('fa-toggle-off', 'fa-toggle-on');
    }
};

export const validateEmail = (email) => {
    return email === '' || !validator.isEmail(email);
};

export const next = () => {
    const pages = document.getElementsByClassName('page');
    let currentPage;

    for (const page of pages) {
        if (page.classList.contains('flex')) {
            currentPage = page;
            break;
        }
    }

    if (currentPage.id === 'page1') {
        currentPage.classList.replace('flex', 'hidden');
        document.getElementById('page2').classList.replace('hidden', 'flex');
    } else if (currentPage.id === 'page2') {
        currentPage.classList.replace('flex', 'hidden');
        document.getElementById('page3').classList.replace('hidden', 'flex');
    } else if (currentPage.id === 'page3') {
        currentPage.classList.replace('flex', 'hidden');
        document.getElementById('page4').classList.replace('hidden', 'flex');
    }
}

export const back = () => {
    const page = document.getElementsByClassName('page');
    const element = Array.from(page)
    let current_page;
    element.forEach(e => {
        if (e.classList.contains('flex'))
            current_page = e.id;
    });

    document.getElementById(current_page).classList.replace('flex', 'hidden');
    switch (current_page) {
        case "page2":
            document.getElementById('page1').classList.replace('hidden', 'flex');
            break;
        case "page3":
            document.getElementById('page2').classList.replace('hidden', 'flex');
            break;
        case "page4":
            document.getElementById('page3').classList.replace('hidden', 'flex');
            break;
        default:
            break;
    }
}