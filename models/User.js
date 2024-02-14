import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    mobileNumber: {
      type: Number,
      required: false,
    },
    socketId: {
      type: String,
      required: false,
      default: null
    },
    password: {
      type: String,
      required: false,
    },
    deletedStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
