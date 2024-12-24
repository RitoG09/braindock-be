import express from "express";
import authRoute from "./routes/authRoute";
import brainRoute from "./routes/brainRoute";
import linkRoute from "./routes/linkRoute";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/brain", brainRoute);
app.use("/api/v1/link", linkRoute);
// app.use("/api/v1/");

app.get("/", (req, res) => {
  res.send("everything is ok!");
});

app.listen(PORT, () => {
  console.log("backend is listening!");
});
