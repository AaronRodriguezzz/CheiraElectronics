import React from 'react'
import { post_data } from '../../../services/postMethod';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const RegistrationSection = ({ setRegistration }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [registrationForm, setRegistrationForm] = useState({
        full_name: "",
        email: "",
        password: "",
        contact_number: "",
        address: "",
    });

    const handleChange = (e) => {
        setRegistrationForm({
            ...registrationForm,
            [e.target.name]: e.target.value,
        })
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await post_data("/register", registrationForm);
            if (response) {
                localStorage.setItem("user", JSON.stringify(response?.customer));
                navigate("/");
            }
        } catch (err) {
          console.log(err);
        }finally{
            setLoading(false);
        }
    };
    
    return (
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
                className="bg-orange-600 hover:bg-orange-700 transition text-white font-semibold text-lg py-3 rounded-md w-full disabled:bg-orange-500/50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {!loading ? 'Register' : 'Processing...'}
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
    )
}

export default RegistrationSection