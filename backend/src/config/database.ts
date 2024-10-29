import mongoose from "mongoose";

export default function(){
        console.log(process.env.MONGOOSEURI)
        mongoose.connect('mongodb://localhost:27017'!, {
            
        }).then(()=>
            console.log("database connected successfully")
        ).catch(error=>new Error("Database not connected"))
        
    }


