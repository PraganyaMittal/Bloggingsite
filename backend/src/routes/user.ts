import { Router, Request, Response } from 'express'
import User, { IUser } from '../model/user';
import { profile } from '../config/multer';
import fs from 'fs'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


const router = Router();

interface ILoginUser {
    email: string,
    password: string
}
interface IUserType {
    email : string,
    _id : string
}


router.post('/register', profile.single('pic'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(413).json(`File not uploaded!, Please 
                            attach jpeg file under 5 MB`);
            return;
        }
        const userFound = await User.findOne({ email: req.body.email });

        if (userFound) {
            throw new Error("User already exist")
        }

        const newUser = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            title: req.body.title,
            description: req.body.description,
            profileImage: req.file.path
        });

        await newUser.save();

        res.status(200).json(`User register successfully`);
    } catch (error) {

        if (error instanceof Error) {

            if (req.file?.path)
                fs.unlinkSync(req.file?.path!)
            res.status(500).json(error.message);
        }
    }
})

router.post('/login', async (req: Request<never, ILoginUser>, res: Response) => {
    try {
        const email = req.body?.email;
        const password = req.body?.password;
        

        if (!email || !password)
            throw new Error("Please fill all the fields")

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
                message: 'Email not found',
                success : false
            });
            return
        }
        const check = await bcrypt.compare(password, user?.password);
        if (!check) {
            res.status(401).json({
                message: 'Invalid email or password',
                success : false
            })
            return
        }
        const loggedInUser = await User.aggregate([
            { $match: { _id: user._id } },
            { $project: { password: 0 } }
        ]);
        const token = AssignCookie(loggedInUser[0]._id,loggedInUser[0].email, process.env.PRIVATE_KEY!)
        res.json({
            message: "Logined successfully",
            data: {...loggedInUser[0], token : token}
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Something went wrong",
                success : "false"
            }
            )
        }
    }
})
router.post("/validate", (req : Request, res)=>{
    try{
        const token = req.cookies?.auth_token;
        if(!token)
            throw new Error();

        res.status(200).json({
            validated : true,
        })
    }catch(error){
        res.status(401).json({
            validated : false,
        })
    }
})
router.post('/get', (req, res)=>{
    res.cookie('auth', '').send("hello");  
})

router.get('/authors', async (req, res)=>{
    try{
        const user = await User.findOne({});
        const AllUsers = await User.aggregate([
            { $match : {}},
            { $project: { password: 0 } }
        ]);
        return res.json({
            data : AllUsers,
        })
    }catch{
        
    }
})

function AssignCookie(userId : string, email : string, privateKey : string){
    const jwt = jsonwebtoken;
    const data = {
        email : email,
        userId : userId
    }
    const token = jwt.sign(data, privateKey)
    return token;
}


export default router;