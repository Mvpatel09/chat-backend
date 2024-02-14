import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db connected "+process.env.MONGO_URL);
  })
  .catch((e) => {
    console.log(e);
  });
