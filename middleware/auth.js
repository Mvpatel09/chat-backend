import jwt from "jsonwebtoken";
import { HTTPResponse } from "../utils/HTTPResponse.js";

const AuthCheckPatient = (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return HTTPResponse.BAD_REQUEST(res, {
      message: "No Token Found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.data) {
      return HTTPResponse.BAD_REQUEST(res, {
        message: "Invalid Token",
      });
    }
    req.decodedId = decoded.data.id;
    next();
  });
};

export default AuthCheckPatient;