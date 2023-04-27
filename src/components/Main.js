import React from "react";
import { checkIfLoggedIn } from "./checkIfLoggedIn";
import {SignIn} from "./SignIn";
export const Main = () => {
  const isLoggedIn = checkIfLoggedIn();
  return (

    <div>
      {isLoggedIn ? (
        <div>You are Logged in</div>
      ) : (
       <SignIn/>
      )}
    </div>
  )
}
