const express = require("express");
const app = express();
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });


app.get('/users/:userId', (req, res) => {
 const userId = req.params.userId;
 res.send(`User ID: ${userId}`);
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
