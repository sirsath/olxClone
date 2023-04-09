const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")

const productStorage = multer.diskStorage({
     filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedExtensions = [".png", ".jpg", ".jpeg" , ".webp"]
        if (!allowedExtensions.includes(ext)) {
            cb("invalid file extension")
        } 
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        const loc = "public/assets/images/products"
        if (!fs.existsSync(loc)) {
            fs.mkdirSync(loc, { recursive: true })
        }
        cb(null, loc)
    },
})
exports.productUpload = multer({
    storage: productStorage
}).array("productImage", 5) 