import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-500 tracking-tighter">Cheira Electronics</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Home</Link>
        <Link to="/service-catalog" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Services</Link>
        <Link to="/submit-request" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Request</Link>
        <Link to="/contact" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">Contact</Link>
        <Link to="/about" className="text-gray-700 tracking-tighter hover:text-orange-500 font-medium">About</Link>
        <Link to="/login" className="bg-orange-500 tracking-tighter text-white rounded-full px-4 py-2 font-semibold">Login</Link>
      </div>
    </nav>
  );
}
