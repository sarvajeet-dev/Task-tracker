import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken, generateToken } from "../utils/jwt";
import { generaterefreshToken } from "../utils/jwt";

export const register = async (req, res) => {
    const { name, email, password, role, organisationId } = req.body;

    const existingUser = await User.findOne(email)
    if (existingUser) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        hashpassword,
        email,
        role,
        organisationId

    })
    res.status(201).json({
        message: "User created successfully",
        user,
    });

}

export const login = async (res, req) => {
    const { email, password } = req.body;

    const user = User.findOne(email)
    if (!user) {
        return res.status(401).json({
            message: "Invalid credential"
        })

    }

    const isMatched = await bcrypt.compare(password, user.password)

    if (!isMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }
    
    const accessToken = generateToken(user)
    const refreshToken = generaterefreshToken(user)
    user.refreshToken = refreshToken 

    await user.save()

    res.status(200).json({
        accessToken,
        refreshToken,
      });


}


export const refreshToken = async(req , res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) {
        return res.status(401).json({
            message : "Refresh Token Required"
        })
    }

    const user = await User.findOne(refreshToken)
    if(!user) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        })
    }
    const newAccessToken = generateToken(user)
    const newRefreshToken = generaterefreshToken(user);

    user.refreshToken = newRefreshToken;

    await user.save()
    res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
}