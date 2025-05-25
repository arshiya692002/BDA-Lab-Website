const jwt = require("jsonwebtoken");
const { JWT } = require("../private");

const verifyUser = (req, res, next) => {
    jwt.verify(req.cookies.access_token, JWT, (err, user) => {
        req.user = user;
        next();
    })
}

exports.verifyUser = verifyUser;