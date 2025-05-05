import React from "react";
import Link from 'next/link';
import NavUserProfile from "./NavUserProfile";
import NavTabs from "./NavTabs";

interface NavBarProps {
  
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <NavTabs />
      <NavUserProfile />
    </nav>
  );
};

export default NavBar;