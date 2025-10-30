import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Wrench, ShieldCheck, UserCog } from "lucide-react";
import { post_data } from "../../services/PostMethod";
import { useUserProtection } from '../../hooks/protectHooks';
import { useAuth } from "../../contexts/UserContext";

export default function Login() {
  useUserProtection();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = await post_data('/login/admin', form);

      if(response){
        setUser(response.account);
        navigate("/admin", { replace: true });
      }
      
    }catch(err){
      console.log(err);
    }
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Left Orange Side */}
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

      {/* Right Login Form Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-10 py-12 rounded-2xl shadow-lg w-[28rem] space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-orange-500 tracking-tight">Admin Login</h2>
    
          <TextField
            fullWidth
            label="Username"
            name="email"
            variant="outlined"
            value={form.email}
            onChange={handleChange}
            sx={{marginBottom: 2}}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            value={form.password}
            onChange={handleChange}
            sx={{marginBottom: 2}}
          />

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 transition text-white font-semibold text-lg py-3 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>

    </div>
  );
}
