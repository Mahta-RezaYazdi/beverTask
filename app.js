const express = require("express");
const session = require("express-session");

const path = require("path");
const bodyParser = require("body-parser");

const invoiceRoutes = require("./routes/invoices");
const userRoutes = require("./routes/user");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(invoiceRoutes);


// 404 Not Found
app.use(errorController.get404Page);

// Centralized Error Handling
app.use(errorController.getError);

//  I commented out the environment variables since they are not included in the git repository and I wanted to make it
// simple for you to run the code. 

// const PORT = process.env.PORT;
// const hostname = process.env.HOSTNAME;

const PORT = 8080
const hostname = "127.0.0.1"

app.listen(PORT, hostname, () => {
    console.log(`Listening on http://${hostname}:${PORT}`);
});