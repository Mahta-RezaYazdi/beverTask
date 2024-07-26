exports.postLoginUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect("/?error=Username and password are required.");
    }

    try {
        const user = req.users.find((user) => user.Name === username);

        if (user) {
            if (user.Password === password) {
                req.session.user = user;
                res.redirect("/invoices")
            } else {
                res.redirect("/?error=Wrong Password");
            }
        } else {
            res.redirect("/?error=Invalid username");
        }

    } catch (error) {
        res.next({ status: 500, message: "Internal Server Error!" });
    }
};

exports.getLogoutUser = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return res.next({ status: 500, message: "Failed to log out." });
        }
    })
    res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
    res.redirect("/");
};