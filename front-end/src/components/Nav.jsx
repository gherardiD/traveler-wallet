import { useState } from "react";
import menu from "../assets/menu.svg";
import close from "../assets/close.png";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "wallet",
    title: "Wallet",
  },
  {
    id: "currencies",
    title: "Currencies",
  },
  {
    id: "profile",
    title: "Profile",
  },
];

function Nav() {
  const [page, setPage] = useState("Home");
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div>
      <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* Logo */}
      <h1 className="text-3xl text-white">Logo</h1>
      
      {/* Desktop Navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              page === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setPage(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={menuOpened ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setMenuOpened(!menuOpened)}
        />

        {/* Sidebar */}
        <div
          className={`${
            !menuOpened ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  page === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setPage(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Nav
