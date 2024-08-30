import { Response, Router, Request } from "express";
import { thumbnail } from '../config/multer'
const router = Router();
import fs from 'fs'
import Blog from "../model/blog";
import { Auth } from "../middleware/authorization";


interface IBlogCreation {
    title: string,
    paragraph: Array<string>,
    userId: string
}
interface IBlogUpdation {
    title: string,
    paragraph: Array<string>,
    userId: string,
    blogId : string
}




router.get('/all', async (req : Request, res : Response)=>{
    try{
        const response = await Blog.find({});
        if(!response){
            throw new Error("Error while fetching from Database");
        }
        return res.json({
            success : true,
            data : response
        })
    }catch(error){
        if(error instanceof Error){
            return res.json({
                success : true,
                message : error.message
            })
        }
    }
})


router.post('/create', thumbnail.single('image'), async (req: Request<never, IBlogCreation>, res: Response) => {
    try {

        if (!req.file) {
            res.status(413).send({
                message: `File not uploaded!, Please 
                            attach jpeg file under 5 MB`
            });
            return;
        }
        if (!req.body.title || !req.body.paragraph || !req.body.userId) {
            fs.unlinkSync(req.file.path);
            res.status(500).send({
                message: "Something went wrong"
            });
            return;
        }

        
        const blog = new Blog({
            title : req.body.title,
            paragraph : req.body.paragraph,
            userId : req.body.userId,
            imagePath : req.file.path
        })

        await blog.save();
        // successfull completion
        res.status(201).send({
            message: "Blog uploaded successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "Something went wrong"
        });
    }
})

router.post('/update', Auth, thumbnail.single('image'), async (req: Request<never, IBlogUpdation>, res: Response) => {
    try {

        // if (!req.file) {
        //     res.status(413).send({
        //         message: `File not uploaded!, Please 
        //                     attach jpeg file under 5 MB`
        //     });
        //     return;
        // }
        if (!req.body.title || !req.body.paragraph || !req.body.userId || !req.body.blogId) {
            // fs.unlinkSync(req.file.path);
            res.status(500).send({
                message: "Something went wrong"
            });
            return;
        }

        const blog_id = req.body.blog_id;
        
        await Blog.findOneAndUpdate({_id : blog_id}, {
            title : req.body.title,
            paragraph : req.body.paragraph
        },
        {new : true});

        

        // successfull completion
        res.status(201).send({
            message: "Blog Updated successfully",
            success : true,
        });

    } catch (error) {
        res.status(500).send({
            message: "Something went wrong",
           
        });
    }
})

router.post('/user', async (req : Request, res : Response)=>{
    try{
        const userId = req.body?.userId;
        const response = await Blog.find({userId});
        if(!response){
            throw new Error("Error while fetching from Database");
        }
        return res.json({
            success : true,
            data : response
        })
    }catch(error){
        if(error instanceof Error){
            return res.json({
                success : true,
                message : error.message
            })
        }
    }
})


export default router
