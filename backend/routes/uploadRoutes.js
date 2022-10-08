const path = require('path')
const express = require('express')
const multer = require('multer')
const { cloudinary } = require('../config/db')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Products',
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    return cb(new Error('Upload Images(.jpg, .jpeg, .png) only!'))
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`${req.file.path}`)
})

module.exports = router
