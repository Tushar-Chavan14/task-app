import mongoose from "mongoose";

const dbname = "taskmanger";

const connectionUrl = `mongodb+srv://tushar:tushar1402@cluster0.greovua.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
});
