import User from "../models/User.js";
import bcrypt from "bcryptjs";
import GenrateToken from "../utils/generateToken.js";
import { HTTPResponse } from "../utils/HTTPResponse.js";

export async function Login(req, res) {
  try {
    let { password, email } = req.body;

    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return HTTPResponse.BAD_REQUEST(res, {
        message: "User is not exist by this email",
      });
    }
    const match = await bcrypt.compare(password, checkEmail.password);
    if (!match) {
      return HTTPResponse.BAD_REQUEST(res, {
        message: "email and password are mismatch",
      });
    }
    const token = await GenrateToken({
      id: checkEmail._id,
    });
    return HTTPResponse.OK(res, {
      message: "success",
      data: { token },
    });
  } catch (e) {
    return HTTPResponse.INTERNAL_SERVER_ERROR(res, {
      message: e.message,
    });
  }
}
export async function SignUp(req, res) {
  try {
    let { password, email, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    let encreptPassword = await bcrypt.hash(password, salt);
    let checkEmail = await User.findOne({ $or: [{ userName }, { email }] });
    if (checkEmail) {
      return HTTPResponse.BAD_REQUEST(res, {
        message: "Email or UserName already exist.",
      });
    }
    new User({ ...req.body, password: encreptPassword }).save().then((e) => {
      return HTTPResponse.CREATED(res, {
        message: "User created",
      });
    });
  } catch (e) {
    return HTTPResponse.INTERNAL_SERVER_ERROR(res, {
      message: e.message,
    });
  }
}

export async function getAllUser(req, res) {
  try {
    const getAllUser = await User.find({}).select({ password: 0 })
    return HTTPResponse.OK(res, {
      data: getAllUser,
    });
  } catch (e) {
    return HTTPResponse.INTERNAL_SERVER_ERROR(res, {
      message: e.message,
    });
  }
}