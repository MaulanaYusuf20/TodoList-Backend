require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
    login: async (req, res) => {
        const data = req.body;

        try {
            const user = await User.findOne({
                where: { username: data.username },
            });

            const passwordMatch = bcrypt.compareSync(
                data.password,
                user.password
            );
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_KEY
            );

            if (!user || !passwordMatch)
                throw new Error("username or password incorrect");

            res.json({
                message: "Login succesfully",
                data: {
                    userId: user.id,
                    name: user.name,
                    token,
                },
            });
        } catch (err) {
            res.status(400).json({
                status: "Bad Request",
                message: err.message,
            });
        }
    },

    register: async (req, res) => {
        const data = req.body;

        try {
            const hashPassword = bcrypt.hashSync(data.password, saltRounds);
            data.password = hashPassword;

            await User.create(data);

            res.status(201).json({
                message: "Register succesfully",
            });
        } catch (err) {
            res.json(err.message);
        }
    },
};
