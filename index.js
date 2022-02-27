require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
const router = require("./routes/index");
const sequelize = require("./db");

// var privateKey = fs.readFileSync("./certs/certificate.key", "utf8");
// var certificate = fs.readFileSync("./certs/certificate_ca.crt", "utf8");
// var credentials = {
// key: privateKey,
// cert: certificate,
// };
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");

    // https
    // .createServer(credentials, app)
    // .listen(SSL_PORT, () =>
    // console.log(`https server started on port ${SSL_PORT}`)
    // );
    app.listen(PORT, () => console.log(`https server started on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

start();
