const { createUserToken } = require('../middleware/auth.js');
const User = require('../models/BookUsers');
const bcrypt = require("bcrypt");

const handleCreateNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "email already exist", existingUser: true })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            const token = await createUserToken(user._id)
            return res.status(200).json({ message: "user created successfully", user: user, token })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
}

const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found, check your email or create a new account"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                passwordMatch: isPasswordValid
            });
        }

        const token = await createUserToken(user._id)

        return res.status(200).json({ message: "user founded successfully", user: user, token })


    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
}

const handleGuestoLogin = async (req, res) => {
    try {
        const guest = await User.findOne({
            email: "guest@gmail.com",
        });

        if (!guest) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare("123456789", guest.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const token = await createUserToken(guest._id)

        return res.status(200).json({ message: "user founded successfully", user: guest, token })


    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = { handleCreateNewUser, handleLoginUser, handleGuestoLogin }