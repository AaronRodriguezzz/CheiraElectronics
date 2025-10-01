import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/UserContext';
import { post_data } from '../../../services/postMethod';

const LoginSection = ({ setRegistration }) => {
    const { setUser } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await post_data("/login/user", form);

            if (response) {
                setUser(response?.account);
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
                className="bg-orange-600 hover:bg-orange-700 transition text-white font-semibold text-lg py-3 rounded-md w-full disabled:bg-orange-600/50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {!loading ? 'Login' : 'Submitting...'}
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
    )
}

export default LoginSection