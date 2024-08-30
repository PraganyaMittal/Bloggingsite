import { Router } from "express";
import BlogRouter from './blog.js'
import UserRouter from './user.js'

const MainRouter = Router()

MainRouter.use('/blog', BlogRouter)
MainRouter.use('/user', UserRouter);

export default MainRouter;