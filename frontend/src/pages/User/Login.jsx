import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Wrench, ShieldCheck, UserCog } from "lucide-react";
import { post_data } from "../../services/postMethod";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [registrationForm, setRegistrationForm] = useState({
    full_name: "",
    email: "",
    password: "",
    contact_number: "",
    address: "",
  });
  const [registration, setRegistration] = useState(false);

  const handleChange = (e) => {
    registration
      ? setRegistrationForm({
          ...registrationForm,
          [e.target.name]: e.target.value,
        })
      : setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await post_data("/register", registrationForm);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response?.customer));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post_data("/login/user", form);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response?.account));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className="bg-white px-10 py-12 rounded-2xl shadow-xl w-[28rem] space-y-8"
          >
            <h2 className="text-3xl font-bold text-center text-orange-600">
              Admin Login
            </h2>

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 transition text-white font-semibold text-lg py-3 rounded-md w-full"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account yet?
              <a
                className="text-orange-600 font-semibold cursor-pointer ml-1 hover:underline"
                onClick={() => setRegistration(true)}
              >
                Create Account
              </a>
            </p>
          </form>
        ) : (
          // Registration Form
          <form
            onSubmit={handleRegister}
            className="bg-white px-10 py-12 rounded-2xl shadow-xl w-[30rem] space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-orange-600">
              Customer Registration
            </h2>

            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={registrationForm.full_name}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={registrationForm.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={registrationForm.password}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Contact Number"
              name="contact_number"
              value={registrationForm.contact_number}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Address (optional)"
              name="address"
              value={registrationForm.address}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 transition text-white font-semibold text-lg py-3 rounded-md w-full"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <a
                className="text-orange-600 font-semibold cursor-pointer ml-1 hover:underline"
                onClick={() => setRegistration(false)}
              >
                Log in
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
