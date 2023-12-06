import globalModel from "../model/globalModel.js";
import { mysqlDb } from "../integrations/mysqDb.js";
import jwt from "jsonwebtoken";
import { publisher } from "../integrations/rabbitMq.js";

const userController = {};

userController.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validating the data
        if (!username || !email || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        // Checking if username and email already exist
        const [existingUser, fields] = await mysqlDb.execute("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);

        if (existingUser.length > 0) {
            return res.status(400).send({ message: "Username or email already exists" });
        }

        // Encrypting the password
        const hashedPassword = await globalModel.encrptPassword(password);

        // Inserting the user data into the mysql 
        var [result] = await mysqlDb.execute("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword]);

        const userId = result.insertId;
        res.status(201).send({ message: "Registration successful" });

        // Publishing Event
        publisher("user_registered", { userId, username, email });
    } catch (error) {
        res.sendStatus(500);
        console.log("=> userController.register :", error.toString());
    }
};

userController.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validating the data
        if (!email || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        // Fetching the users data from the database
        const [user, fields] = await mysqlDb.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Comparing hashed password with entered password
        if (!(await globalModel.decryptPassword(password, user[0].password_hash))) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Generating JWT Token
        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).send({ message: "Login successful", token });
    } catch (error) {
        res.sendStatus(500);
        console.log("=> userController.authenticate :", error.toString());
    }
};

export default userController;
