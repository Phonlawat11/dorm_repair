const RepairController = require('./controllers/RepairController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const upload = require('./middleware/fileUpload') // นำเข้าตัวจัดการอัปโหลด

module.exports = (app) => {
    // --- ทดสอบระบบ ---
    app.get('/status', (req, res) => {
        res.send({ message: 'Backend ทำงานปกติ พร้อมระบบอัปโหลดรูป!' })
    })

    // --- ระบบล็อกอิน / สมัครสมาชิก ---
    app.post('/register', UserAuthenController.register)
    app.post('/login', UserAuthenController.login)

    // --- ระบบจัดการผู้ใช้งาน ---
    app.get('/users', UserController.index)
    app.get('/user/:id', UserController.show)
    app.put('/user/:id', UserController.put)
    app.delete('/user/:id', UserController.remove)

    // --- ระบบจัดการใบแจ้งซ่อม (แก้ไขบรรทัด POST /repair) ---
    // upload.single('image') หมายถึงรับไฟล์ 1 ไฟล์จากชื่อฟิลด์ 'image'
    app.post('/repair', upload.single('image'), RepairController.create) 
    
    app.get('/repairs', RepairController.index)
    app.get('/repair/:id', RepairController.show)
    app.put('/repair/:id', RepairController.put)
    app.delete('/repair/:id', RepairController.remove)
}