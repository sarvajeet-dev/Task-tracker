import bcrypt from "bcryptjs";
import User from "../models/User";

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