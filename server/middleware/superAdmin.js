// server/middleware/superAdmin.js
module.exports = function (req, res, next) {
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ msg: 'Access denied. Super Admin privileges required.' });
    }
    next();
};