import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Wrench, ShieldCheck, UserCog } from "lucide-react";
import { post_data } from "../../services/postMethod";
import { isFormValid } from "../../utils/objectValidation";
import CustomAlert from "../../components/modals/CustomerAlert";

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
        registration ? 
            setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value }) : 
            setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try{
            const response = await post_data('/register', registrationForm);

            if(response){
                localStorage.setItem('user', JSON.stringify(response?.customer));
                navigate('/')
            }
        
        }catch(err){
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await post_data('/login/user', form);

            if(response){
                localStorage.setItem('user', JSON.stringify(response?.account));
                navigate('/')
            }
            
        }catch(err){
            console.log(err);
        }
    };
    
    return (
        <div className="min-h-screen flex">
        {/* Left Orange Side */}
        <div className="w-1/2 bg-orange-500 text-white flex flex-col justify-center items-center p-10 space-y-6">
            <img src="/img/cheiralogo.png" alt="Logo" className="w-40" />
            <h1 className="text-3xl font-bold">Cheira Electronics</h1>
            <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Wrench size={28} />
                <span>Reliable Electronics Repair</span>
            </div>
            <div className="flex items-center gap-3">
                <ShieldCheck size={28} />
                <span>Secure Admin Access</span>
            </div>
            <div className="flex items-center gap-3">
                <UserCog size={28} />
                <span>Manage Services & Technicians</span>
            </div>
            </div>
        </div>

        {/* Right Login Form Side */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
            {!registration ? (
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
                        className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold text-lg py-3 rounded-md w-full"
                    >
                        Login
                    </button>

                    <div className="border-1 border-gray-200"/>

                    <p className="text-center text-sm">
                        Doesn't have an account yet? 
                        <a className="text-blue-400 underline cursor-pointer ml-1" onClick={() => setRegistration(true)}>Create Account</a>
                    </p>
                </form>
            ):(
                <form
                    onSubmit={handleRegister}
                    className="bg-white px-10 py-12 rounded-2xl shadow-lg w-[30rem] space-y-6"
                >
                    <h2 className="text-3xl font-bold text-center text-orange-500 tracking-tight">
                        Customer Registration
                    </h2>
        
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="full_name"
                        value={registrationForm.full_name}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                    />
        
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={registrationForm.email}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                    />
        
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={registrationForm.password}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                    />
        
                    <TextField
                        fullWidth
                        label="Contact Number"
                        name="contact_number"
                        value={registrationForm.contact_number}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                    />
        
                    <TextField
                        fullWidth
                        label="Address (optional)"
                        name="address"
                        value={registrationForm.address}
                        onChange={handleChange}
                        sx={{marginBottom: 2}}
                    />
                    
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold text-lg py-3 rounded-md w-full"
                    >
                        Register
                    </button>

                    <div className="border-1 border-gray-200"/>

                    <p className="text-center text-sm">
                        Already have an account?
                        <a className="text-blue-400 underline cursor-pointer ml-1" onClick={() => setRegistration(false)}>Log in</a>
                    </p>
                </form>
            )}
        </div>

        </div>
    );
}
