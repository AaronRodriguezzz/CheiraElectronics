import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import { useUser } from "../../hooks/protectHooks";

export default function Navbar({ setSideBarOpen }) {
  const navigate = useNavigate();
  const user = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const navClicked = (id) => {
    navigate("/"); // go home first
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 500);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full top-0 left-0 bg-black shadow-md shadow-orange-800 px-2 py-4 md:px-10 md:py-6 flex justify-between items-center z-20">
        {/* Mobile menu toggle */}
        <button className="visible md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} color="orange" /> : <Menu size={26} color="orange" />}
        </button>

        {/* Brand name */}
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 tracking-tight">
          Cheira Electronics
        </h1>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6 text-white text-base md:text-lg items-center">
          {["Home", "About Us", "Contacts", "Services"].map((text) => (
            <li
              key={text}
              onClick={() => navClicked(text)}
              className="text-orange-500 hover:text-orange-400 font-medium list-none cursor-pointer transition-colors"
            >
              {text}
            </li>
          ))}
          <Link
            to="/request-form"
            className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
          >
            Request
          </Link>
        </div>

        {/* User / Login button */}
        {user ? (
          <button
            onClick={() => {
              setSideBarOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-1 font-semibold bg-orange-500 px-3 py-2 md:px-4 md:py-2 rounded-full text-white hover:bg-orange-600 transition-colors text-sm md:text-base"
          >
            <UserCircle size={20} />
            <span className="hidden sm:inline">{user?.full_name}</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 text-white rounded-full px-4 py-2 font-semibold text-sm md:text-base hover:bg-orange-600 transition-colors"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed top-[70px] left-0 w-full flex flex-col gap-3 items-center bg-black/95 py-5 md:hidden z-10">
          {["Home", "About Us", "Contacts", "Services"].map((text) => (
            <li
              key={text}
              onClick={() => navClicked(text)}
              className="text-white text-lg tracking-tight hover:text-orange-500 font-medium list-none cursor-pointer"
            >
              {text}
            </li>
          ))}
          <Link
            to="/request-form"
            onClick={() => setIsOpen(false)}
            className="text-white text-lg tracking-tight hover:text-orange-500 font-medium"
          >
            Request
          </Link>
        </div>
      )}
    </>
  );
}
