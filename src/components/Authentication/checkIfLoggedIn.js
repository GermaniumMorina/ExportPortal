export function checkIfLoggedIn() {
    return Boolean(localStorage.getItem("userLoggedIn"));
}

