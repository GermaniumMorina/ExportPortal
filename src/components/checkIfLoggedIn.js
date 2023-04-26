export function checkIfLoggedIn() {
    return Boolean(localStorage.getItem("token"));;
  }
  //Replace this return Boolean whenn the database is READY