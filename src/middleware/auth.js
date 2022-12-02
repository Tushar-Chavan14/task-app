import Jwt from "jsonwebtoken";
import { userModel } from "../db/models/usersModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifiedToken = Jwt.verify(token, "secret");

    const user = await userModel.findOne({
      _id: verifiedToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("your not authneticated");
  }
};

export default auth;
