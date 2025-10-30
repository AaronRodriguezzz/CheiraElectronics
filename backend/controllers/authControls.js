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

        const adminObj = user.toObject();
        const { password: _, ...account } = adminObj;

        // Generate JWT
        const token = jwt.sign(
            account,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );  

        res.cookie(accountType === 'user' ? 'user_token' : 'admin_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' // Only secure in production
        });

        // Send success response
        return res.status(200).json({
            message: 'Login successful',
            account
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};

export const tokenProtection =  async (req, res) => {
    const userToken = req.cookies?.user_token ; 
    const adminToken = req.cookies?.admin_token

    if (!userToken && !adminToken) {
      return res.status(401).json({ message: 'No token found' });
    }

    const token = userToken || adminToken;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ user: decoded });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

export const admin_logout = (req, res) => {
    const tokenType = req.params.type;

    if(!tokenType){
        res.status(400).json({ message: 'Account Type Invalid'})
    }
    try {
        // Clear the jwt cookie
        res.clearCookie(tokenType, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.sendStatus(200).json({message:'Successfully Log out'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Logout error' });
    }
};

export default {
    login,
    admin_logout,
    tokenProtection
};