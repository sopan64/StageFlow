function admin (req, res, next) {

    if(req.user.role !== "admin"){

        return res.status(403).json({
            message: "Access denied! this feature is for Admins only"
        });
    }

    next();
}

module.exports = admin;