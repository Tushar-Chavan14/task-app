import mongoose from "mongoose";

const connectionUrl = process.env.MongoDbUri;

export const connectDb = async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
    });
  } catch (er) {
    console.log(er);
  }
};
