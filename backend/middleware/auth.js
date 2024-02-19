const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const Auth = req.headers.authorization;
    if (Auth && Auth.split(" ")[0] === "Bearer") {
        const token = Auth.split(" ")[1];
        if (token) {
            return jwt.verify(token, "ss hh dd", function(err, decoded) {
                if (err) {
                    res.status(401).json({
                        status: false,
                        status: 401,
                        message: "Signature verification is failed please login again",
                    });
                } else {
                    req.user = {
                        id: decoded.id,
                        email: decoded.email,
                        role: decoded.role,
                        branchId: decoded.branchId,
                        publicId: decoded.publicId,
                        companyId: decoded.companyId,
                        exp: decoded.exp,
                    };
                    next();
                }
            });
        } else {
            next();
        }
    } else {
        let response = {};
        res.status = 401;
        response.status = 401;
        response.message = "Token not provided.";
        return res.json(response);
    }
};

module.exports = {
    auth,
};