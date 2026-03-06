import User from "../models/user.js"
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