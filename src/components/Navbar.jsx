import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="text-white bg-slate-800 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))">
      <div className="flex justify-between items-center py-2 pl-10 pr-10">
        <div className="px-4 flex items-center gap-1 font-mono text-2xl cursor-default">
          <img width={40} src="icons8-password.svg" alt="logo" /> <span>MYPASS</span>
        </div>

        <div>
          <a target="_blank" href={"https://github.com/shabareesha185"}>
            <div className="flex justify-center items-center text-xl w-fit border rounded-full cursor-pointer p-1">
              <FaGithub size={30} />
              <p className="px-1">GitHub</p>
            </div>
          </a>
        </div>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
