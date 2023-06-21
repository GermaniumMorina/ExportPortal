export function checkIfAdmin() {
    return Boolean(localStorage.getItem("isAdmin"));
}

