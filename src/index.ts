import express from "express";
import authRoute from "./routes/authRoute";
import brainRoute from "./routes/brainRoute";
import linkRoute from "./routes/linkRoute";
import cors from "cors";
import auth from "./middlewares/auth";

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/brain", auth, brainRoute);
app.use("/api/v1/link", auth, linkRoute);
// app.use("/api/v1/");

app.get("/", (req, res) => {
  res.send("everything is ok!");
});

app.listen(PORT, () => {
  console.log("backend is listening!");
});
