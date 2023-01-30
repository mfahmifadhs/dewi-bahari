import Users from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const superAdminOnly = async (req, res, next) => {
    console.log(req)
    if (!req.session.userId) {
        return res.status(401).json({ msg: "You must be logged in" });
    }
    const superadmin = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (superadmin.roleId !== 1) return res.status(404).json({ msg: "Akses terlarang" });
    next();
}