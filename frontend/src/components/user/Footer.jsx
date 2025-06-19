import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t p-4 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Cheira Electronics. All rights reserved.</p>
    </footer>
  );
}
