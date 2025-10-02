import React, { useState } from "react";
import { Wrench, ShieldCheck, UserCog } from "lucide-react";
import { useCustomerPageProtection, useUserProtection } from "../../hooks/protectHooks";
import LoginSection from "../../components/user/sections/LoginSection";
import RegistrationSection from "../../components/user/sections/RegistrationSection";

export default function Login() {
  useCustomerPageProtection();

  const [registration, setRegistration] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Branding Side */}
      <div className="w-1/2 bg-gradient-to-b from-orange-600 to-black text-white flex flex-col justify-center items-center p-10 space-y-6">
        <img src="/img/cheiralogo.png" alt="Logo" className="w-40" />
        <h1 className="text-3xl font-bold tracking-wide">
          Cheira Electronics
        </h1>
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-3">
            <Wrench size={28} className="text-orange-300" />
            <span>Reliable Electronics Repair</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-orange-300" />
            <span>Secure Admin Access</span>
          </div>
          <div className="flex items-center gap-3">
            <UserCog size={28} className="text-orange-300" />
            <span>Manage Services & Technicians</span>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        {!registration ? (
          // Login Form
          <LoginSection setRegistration={setRegistration} />
        ) : (
          // Registration Form
          <RegistrationSection setRegistration={setRegistration} />
        )}
      </div>
    </div>
  );
}
