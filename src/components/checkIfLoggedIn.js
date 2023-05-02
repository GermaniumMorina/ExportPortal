export function checkIfLoggedIn() {
    return Boolean(localStorage.getItem("userLoggedIn"));
}
  //Replace this return Boolean whenn the database is READY