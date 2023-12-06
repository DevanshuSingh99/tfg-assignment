import jwt from "jsonwebtoken";

export default (req, res, next) => {
    // Fetching authtoken from headers
    const token = req.headers["authtoken"];

    if (!token) {
        res.sendStatus(401);
        next("UnAuthorized");
    }

    try {
        // Decoding the JWT token to varify it and store the data in the request
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next()
    } catch (err) {
        res.sendStatus(401);
        next("UnAuthorized");
    }
};
