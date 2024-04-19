const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization.split(" ")[1];
  if (!authHeader) {
    return res.status(403).json({ message: "Unauthoruized" });
  }
  try {
    //check valid jwt token
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.userInfo = decoded;
    if (!decoded) {
      return res
        .status(403)
        .json({ message: "token is not correct or expired" });
    }
    next();
  } catch (err) {
    console.log("err", err);
    return res
      .status(403)
      .json({ message: "token is not correct or expired" });
  }
};

module.exports = ensureAuthenticated;
