import ComputerNavBar from "./ComputerNavBar";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";
import PhoneNavBar from "./PhoneNavBar";
import LoggedInNavBarMobile from "./LoggedInNavBarMobile";
import LoggedinNavBarPC from "./LoggedinNavBarPC";

function NavBar() {
  const isLoogedIn=checkIfLoggedIn();
    const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({query:"(max-width :450px"});

  return isLoogedIn ? (
    <div>
      {isDesktopOrLaptop && <LoggedinNavBarPC />}
      {(!isMobile && isTabletOrMobile) && <LoggedInNavBarMobile />}
      {(isPortrait && isMobile) && <LoggedInNavBarMobile/>}
    </div>
  ):(
    <div>
     {isDesktopOrLaptop && <ComputerNavBar />}
      {(!isMobile && isTabletOrMobile) && <PhoneNavBar />}
      {(isPortrait && isMobile) && <PhoneNavBar/>}
    </div>
  )
}

export default NavBar;
