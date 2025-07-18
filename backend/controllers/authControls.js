import Admin from "../models/AdminAccount.js";
import User from "../models/Customer.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const accountType = req.params.type;

        const Account =  {
            admin: Admin,
            user: User
        }

        console.log(req.body);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if(!Account[accountType]){
              return res.status(400).json({ error: "Invalid account type" });
        }

        const Model = Account[accountType];

        // Check if account exists
        const user = await Model.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: 'Sorry, account does not exist' });
        }

        // Compare passwords using bcrypt
        const password_compare = await bcrypt.compare(password, user.password);

        if (!password_compare) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { user },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );  

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' // Only secure in production
        });

        // Send success response
        return res.status(200).json({
            message: 'Login successful',
            account: user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};

export const admin_logout = (req, res) => {
    try {
        // Clear the jwt cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return res.sendStatus(200).json({message:'Successfully Log out'}); // OK
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Logout error' });
    }
};


export const checkAuth = (req, res) => {
    if (!req.employee) {
        return res.status(401).json({ loggedIn: false, message: 'Unauthorized' });
    }

    res.status(200).json({
        loggedIn: true,
        employee: req.employee
    });
};

export default {
    login,
    admin_logout,
    checkAuth,
};