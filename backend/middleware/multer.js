import multer from "multer"

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public")
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

// file filter (only images allowed)
const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true)
  } else {
    cb(new Error("Only images allowed"), false)
  }

}

const upload = multer({
  storage,
  fileFilter
})

export default upload