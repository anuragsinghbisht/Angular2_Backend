// Import dependencies
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";

// Import configuration
import config from "./config";

// Connect to db
mongoose.connect(config.db.uri);

// Import Routes
import routes from "./api/routes/index.route";

// Create express app
const app = express();

// Middlewares
if (config.env === "development") {
  app.use(morgan("dev")); // Console the logs
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routing
app.use("/api", routes);

// Start Server
app.listen(config.port, "localhost", err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`API started on localhost:${config.port}`);
  }
});
