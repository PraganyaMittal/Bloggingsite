import { Schema, model } from "mongoose";

const schema = new Schema({
    userId : {
        type : String,
        required : true
    },
    imagePath : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    paragraph : {
        type : Array,
        required : true
    },
})


export default model('Blog', schema);

