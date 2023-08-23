const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const todos = require("./routes/todo");

const allowedOrigins = ["http://127.0.0.1:5173/", "*"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", todos);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database.");
});
db.on("error", console.error.bind(console, "Mongodb connection error"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
