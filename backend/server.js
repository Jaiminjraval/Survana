// backend/server.js
import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("server is ready yeayy..");
});
app.listen(5007, () => {
  console.log("server started at http://localhost:5007");
});
