import Admin from "../model/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exist" });
  }
  let admin;
  const hashPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "unable to store admin" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async(req,res, next)=>{
    const {email,password} = req.body;
    if(!email && email.trim() === "" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid inputs"});
    }
    let existingadmin;
    try {
        existingadmin = await Admin.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(!existingadmin){
        return res.status(400).json({message:"Admin not found"});
    }
    const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingadmin.password
    );
    if(!isPasswordCorrect){
        return res.status(400).json({message:"invalid password"});
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign({id:existingadmin._id},process.env.SECRET_KEY,{
      expiresIn: "1d",
    })
    // eslint-disable-next-line no-undef
    return res.status(200).json({message:"Authentication complete",token,id:existingadmin._id});
};

export const getAdmins = async(req,res,next)=>{
  let admins;
  try {
    admins = await Admin.find();
  } catch (error) {
    return console.log(error)
  }
  if(!admins){
    return res.status(500).json({message:"Internal Server error"})
  }
  return res.status(200).json({admins})
}