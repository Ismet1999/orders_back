const ApiError = require("../error/ApiError");
const { Users } = require("./../models/models");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  let accessToken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  let refreshToken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
  return {
    accessToken,
    refreshToken,
  };
}

class AuthController {
  async login(req, res, next) {
    try {
      await Users.findOne({
        where: { name: req.body.name, password: req.body.password },
      }).then(async (user) => {
        console.log("user", user.name);
        let tokens = generateAccessToken({ name: user.name, role: user.role });
        let userData = {
          name: user.name,
          role: user.role,
        };
        let data = {
          ...tokens,
          user: userData,
        };
        res.json(data);
      });
    } catch (err) {
      next(err);
    }
  }
  async refresh(req, res, next) {
    try {
      if (req.user.exp - req.user.iat < 3600) return res.sendStatus(401);
      let tokens = generateAccessToken({
        name: req.user.name,
        role: req.user.role,
      });
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
