import express from "express";
import authRoute from "./routes/authRoute";
import brainRoute from "./routes/brainRoute";
import linkRoute from "./routes/linkRoute";

const app = express();

app.use(express.json());
const PORT = 3000;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/brain", brainRoute);
app.use("/api/v1/link", linkRoute);

app.get("/", (req, res) => {
  res.send("everything is ok!");
});

app.listen(PORT, () => {
  console.log("backend is listening!");
});
