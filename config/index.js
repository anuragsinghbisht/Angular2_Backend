const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  db: {
    uri: "mongodb://localhost:27017/exercise"
  }
};

export default config;
