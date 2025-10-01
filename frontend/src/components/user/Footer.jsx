import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black/80 to-black/90 text-white py-8 px-6 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-orange-500">Cheira Electronics</h2>
          <p className="text-sm opacity-80">
            Trusted partner in appliance & tech repairs.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-200 transition">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-sm opacity-80">
          <p className="text-orange-500">© {new Date().getFullYear()} Cheira Electronics</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
