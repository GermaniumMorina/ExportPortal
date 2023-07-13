import ComputerNavBar from "./ComputerNavBar";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { checkIfLoggedIn } from "../Authentication/checkIfLoggedIn";


function NavBar() {
  const isLoogedIn = checkIfLoggedIn();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width :450px" });

  return isLoogedIn ? (
    <div>
  
    </div>
  ) : (
    <div>
      {isDesktopOrLaptop && <ComputerNavBar />}
      {!isMobile && isTabletOrMobile && <ComputerNavBar />}
      {isPortrait && isMobile && <ComputerNavBar />}
    </div>
  );
}

export default NavBar;
