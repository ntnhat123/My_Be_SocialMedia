import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secretKey = 'test'; 
export const register = async (req, res) => {
    const { fullName, email, password,gender } = req.body;
    try{
        const users = await User.findOne({email});
        if(users){
            return res.status(400).json({
                status: false,
                message: 'Email already exists'
            });
        }
        if(!validatorEmail(email)){
            return res.status(400).json({
                status: false,
                message: 'Email is invalid'
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                status: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const pw = await bcrypt.hash(password, 12);
        const user = await User.create({
            fullName,
            email,
            password:pw,
            gender
        })
        const token = jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn: "30d"});
        res.status(200).json({
            status: true,
            data: user,
            token
        });

    } catch (err) {
        res.status(500).json({
          status: false,
          message: err.message,
        });
    }
    
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            status: false,
            message: 'Please enter email and password'
        });
    }

    try{
        const loginUSer = await User.findOne({email}).exec();
        if(!loginUSer){
            return res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, loginUSer.password);
        if(!isMatch){
            return res.status(200).json({
                status: false,
                message: 'Incorrect password'
            });
        }
        const token = jwt.sign({email: loginUSer.email, id: loginUSer._id}, 'test', {expiresIn: "30d"});
        res.status(200).json({
            status: true,
            message: 'Login success',
            data: loginUSer,
            token
        });
    } catch (err) {
        res.status(500).json({
          status: false,
          message: err.message,
        });
    }
}
export const loginToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            status: false,
            message: 'Please enter token'
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);
        console.log(user)
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Login success',
            data: user,
            token
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

export const loginbyGoogle = async (req, res) => {
    const { email, fullName, tokenId } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ email: user.email, id: user._id }, 'your-secret-key', {
          expiresIn: "30d",
        });
        return res.status(200).json({ user, token });
      }
      const newUser = await User.create({
        fullName,
        email,
        tokenId,
      });
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'your-secret-key', {
        expiresIn: "30d",
      });
      res.status(200).json({ newUser, token });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 1 });
        res.status(200).json({
            status: true,
            message: 'Logout success'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

const validatorEmail = (email) => {
    const re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return re.test(email);
}