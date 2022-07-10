import path from 'path'
import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../', '/public/books/imgs'))
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'text/plain', 'application/pdf']

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export = multer({
  storage, fileFilter
})
