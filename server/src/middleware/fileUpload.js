const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ตรวจสอบว่ามีโฟลเดอร์ public/uploads/ อยู่จริง
    cb(null, './public/uploads/') 
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์เป็น: เวลาปัจจุบัน + นามสกุลเดิม
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
module.exports = upload