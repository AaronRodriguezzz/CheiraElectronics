import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X} from "lucide-react";
import { useUser } from "../../hooks/protectHooks";

export default function Navbar({ setSideBarOpen }) {
  const navigate = useNavigate();
  const user = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

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
    <>
      <nav className="fixed w-full top-0 left-0 bg-black shadow-md shadow-orange-800 p-8 flex justify-between items-center z-20">
        <button className="visible md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} color="orange"/>}
        </button>
        <h1 className="text-3xl font-bold text-orange-500 tracking-tighter">Cheira Electronics</h1>

        <div className="space-x-4 hidden text-white text-lg flex-row items-center md:flex">
          {["Home", "About Us", "Contacts", "Services"].map((text) => (
              <li
                key={text}
                onClick={() => navClicked(text)}
                className="text-orange-500 tracking-tighter hover:text-orange-500 font-medium list-none cursor-pointer"
              >
                {text}
              </li>
          ))}
          <Link to="/request-form" className="text-orange-500 tracking-tighter hover:text-orange-500 font-medium">Request</Link>
        </div>

          {user ?  
            <button 
              onClick={() => {
                setSideBarOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-1 font-semibold bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors"
            >
              <UserCircle/> 
              <span className="hidden sm:inline">
                {user?.full_name}
              </span>
            </button> 
            :
            <Link to="/login" className="bg-orange-500 tracking-tighter text-white rounded-full px-4 py-2 font-semibold">Login</Link>
          }
      </nav>

      {isOpen && <div className="fixed top-17 left-0 w-full flex md:hidden flex-col gap-y-4 items-center bg-black/90 p-4 z-100 ">
          {["Home", "About Us", "Contacts", "Services"].map((text) => (
          <li
            key={text}
            onClick={() => navClicked(text)}
            className="text-white tracking-tighter hover:text-orange-500 font-medium list-none cursor-pointer"
          >
            {text}
          </li>
        ))}
        <Link to="/request-form" className="text-white tracking-tighter hover:text-orange-500 font-medium">Request</Link>
      </div>}
    </>
    
  );
}
