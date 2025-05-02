const express = require("express");
const Routes = require("./routes/routes");
const path = require("path");
const { loadOphimMovies } = require("./config/init");
const ENV_VARS = require("./config/vars");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const port = ENV_VARS.PORT;
db.connect();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://cinestream.onrender.com",
    ], // ✅ Allow only specific domains
    credentials: true,
    methods: ["GET", "HEAD", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
  })
);

app.use(
  "/api/avatarImages",
  express.static(path.join(__dirname, "public/avatarImages"))
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
Routes(app);
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
app.get("/status", (req, res) => {
  res.status(200).json({
    message: "Server is alive!",
  });
});

setInterval(() => {
  loadOphimMovies(2);
}, 1000 * 60 * 60 * 24 );
//czJMSeHQEl6MeBie
