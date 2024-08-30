import multer from 'multer'

const thumbnailStorage = multer.diskStorage({
    destination : 'uploads/blogImage',
    filename : (req, file, res)=>{
        res(null, Date.now() + "-" + file.originalname);
    },
})
const profileImageStorage = multer.diskStorage({
    destination : 'uploads/profileImage',
    filename : (req, file, res)=>{
        res(null, Date.now() + "-" + file.originalname);
    },
})
const filterImage = function(req : any, file : any, cb : any){
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"
        || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const limit = {
    // limits file size to 5 MB
    fileSize: 1024 * 1024 * 5
}

export const thumbnail =  multer({
    storage : thumbnailStorage,
    limits : limit,
    fileFilter : filterImage,
})
export const profile = multer({
    storage : profileImageStorage,
    limits : limit,
    fileFilter : filterImage,
})