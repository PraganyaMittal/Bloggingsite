import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'


export interface IUser {
    name: string;
    email: string;
    password : string,
    profileImage : string,
    title : string,
    description : string
    token : string
  }

const schema = new Schema<IUser>({
    name : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
    },
    password : {
        required : true,
        type : String
    },
    profileImage : {
        required : true,
        type : String
    },
    title : {
        required : true,
        type : String
    },
    description : {
        required : true,
        type : String
    },
    token : {
        required : false,
        type : String
    }
})


schema.pre('save', async function (next){
    try{
        const user = this;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    }catch(error){
        if(error instanceof Error)
        next(error);
    }
})

export default model<IUser>('User', schema);

