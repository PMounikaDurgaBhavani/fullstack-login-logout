const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/user");
const taskRouter = require("./routes/task");
const cors = require("cors");
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.port;

app.use(cors());
app.use("/api", router);
app.use("/api", taskRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
