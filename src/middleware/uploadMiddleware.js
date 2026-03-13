import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    console.log("mimetype:", file.mimetype)
    
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new Error("Formato file non supportato"))
    }
}

const upload = multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
})


export default upload