import Image from "next/image";
import React from "react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="w-screen bg-zinc-950 h-[55px] text-white flex items-center ">
      <div className="max-w-[1000px] mx-auto  flex-1 flex items-center justify-between">
        <div className="flex space-x-4">
          <h3>Home</h3>
          <h3>Products</h3>
        </div>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
