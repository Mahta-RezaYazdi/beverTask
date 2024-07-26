const path = require("path");

exports.get404Page = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
};

exports.getError = (err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500);
    res.render("error", {
        message: err.message || "Internal Server Error",
        status: err.status || 500
    })
};