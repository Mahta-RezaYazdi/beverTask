exports.getIndexPage = (req, res) => {
    res.render("index", {
        username: req.session.user ? req.session.user.Name : null,
        error: req.query.error || null
    })
};