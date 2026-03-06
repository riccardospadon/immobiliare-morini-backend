import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "Utente non trovato" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Password non corretta" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const register = async (req, res) => {
    const { email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if(userExists){
            return res.status(400).json({ message: "Utente già esistente" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "Admin creato con successo",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}