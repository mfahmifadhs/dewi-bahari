import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Me = async (req, res) => {
   if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
   }
   const user = await Users.findOne({
      attributes: ['uuid', 'name', 'email', 'roleId'],
      where: {
         uuid: req.session.userId
      }
   });
   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
   res.status(200).json(user);
}

export const Register = async (req, res) => {
   const { roleId, email, name, phoneNum, address, password, confPassword } = req.body;
   if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt);
   try {
      await Users.create({
         roleId,
         email,
         name,
         phoneNum,
         address,
         password: hashPassword,
         passwordText: password
      });
      res.status(201).json({ msg: "Register Berhasil" });
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
}

export const Login = async (req, res) => {
   const user = await Users.findOne({
      where: {
         email: req.body.email
      }
   });
   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
   const match = await bcrypt.compare(req.body.password, user.password);
   if (!match) return res.status(400).json({ msg: "Wrong Password" });
   // req.session.userId = user.uuid;
   const id = user.id;
   const uuid = user.uuid;
   const name = user.name;
   const email = user.email;
   const role = user.roleId;
   res.status(200).json({ id, uuid, name, email, role });
}

// Logout user
export const Logout = (req, res) => {
   req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
      res.status(200).json({ msg: "Anda telah logout" });
   });
}



// Login user
// export const Login = async(req, res) => {
//    try {
//        const user = await Users.findAll({
//            where:{
//                email: req.body.email
//            }
//        });
//        const match = await bcrypt.compare(req.body.password, user[0].password);
//        if(!match) return res.status(400).json({msg: "Wrong Password"});
//        req.session.userId = user[0].uuid;
//        const uuid   = user[0].uuid;
//        const name   = user[0].name;
//        const email  = user[0].email;
//        res.status(200).json({name, email});
//        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
//            expiresIn: '20s'
//        });
//        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
//            expiresIn: '1d'
//        });
//        await Users.update({refreshToken: refreshToken},{
//            where:{
//                id: userId
//            }
//        });
//        res.cookie('refreshToken', refreshToken,{
//            httpOnly: true,
//            maxAge: 24 * 60 * 60 * 1000
//        });
//        res.json({ accessToken });
//    } catch (error) {
//        res.status(404).json({msg:"Email tidak ditemukan"});
//    }
// }