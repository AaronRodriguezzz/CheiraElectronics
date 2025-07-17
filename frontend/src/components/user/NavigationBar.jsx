import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navClicked = (id) => {
    navigate("/"); // navigate to home first
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  return (
    <nav className="sticky top-0 left-0 bg-gray-50 shadow-md p-4 flex justify-between items-center z-20">
      <h1 className="text-2xl font-bold text-orange-500 tracking-tighter">Cheira Electronics</h1>
      <div className="space-x-4 flex flex-row items-center">
        {["Home", "About Us", "Contacts"].map((text) => (
            <li
              key={text}
              onClick={() => navClicked(text)}
              className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium list-none cursor-pointer"
            >
              {text}
            </li>
        ))}

        <Link to="/service-catalog" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Services</Link>
        <Link to="/request-form" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Request</Link>
        <Link to="/login" className="bg-orange-500 tracking-tighter text-white rounded-full px-4 py-2 font-semibold">Login</Link>
      </div>
    </nav>
  );
}
