import mongoose from "mongoose";

const connectionUrl = process.env.MongoDbUri;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
});
