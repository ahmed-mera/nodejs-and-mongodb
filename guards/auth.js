
exports.isUser = (req, res, next) => (req.session.userId) ? res.redirect("/") : next();

exports.logout = (req, res, next) => req.session.destroy(_ => res.redirect("/"))



