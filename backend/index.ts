import express from 'express'
import MainRouter from './src/routes/master.js';
import * as dotenv from "dotenv";
import dbConnect from './src/config/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();
dotenv.config();
app.use(cors({
    origin : '*',
    // origin : ["http://localhost:3000", process.env.FRONTEND_URL!],
    methods: ['GET', 'POST'],
    credentials: true
}))



app.use('/uploads', express.static('./uploads'))
app.use(cookieParser())
dbConnect();


app.use(express.json({
    limit : '20mb',
}))

app.get('/', (req, res)=>{
    console.log('client hit /')
    res.send('working fine');
})

app.use(MainRouter)

app.listen(process.env.PORT, ()=>{console.log("running on 4000")})