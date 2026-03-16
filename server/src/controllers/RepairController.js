const { RepairRequest } = require('../models')

module.exports = {
    // 1. ดึงข้อมูลใบแจ้งซ่อมทั้งหมด (สำหรับ Admin)
    async index(req, res) {
        try {
            const repairs = await RepairRequest.findAll()
            res.send(repairs)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    },

    // 2. ดึงข้อมูลใบแจ้งซ่อมแค่ 1 รายการ หรือค้นหาตาม ID
    async show(req, res) {
        try {
            const repair = await RepairRequest.findByPk(req.params.id)
            res.send(repair)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลใบแจ้งซ่อม' })
        }
    },

    // 3. สร้างใบแจ้งซ่อมใหม่ (สำหรับ User)
    async create(req, res) {
        try {
            const repair = await RepairRequest.create(req.body)
            res.send(repair)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการสร้างใบแจ้งซ่อม' })
        }
    },

    // 4. แก้ไข/อัปเดตสถานะใบแจ้งซ่อม (สำหรับ Admin เปลี่ยนสถานะ)
    async put(req, res) {
        try {
            await RepairRequest.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' })
        }
    },
    
    async create(req, res) {
    try {
        // สร้าง Object ข้อมูลใหม่จากสิ่งที่ส่งมา
        const repairData = {
            room_number: req.body.room_number,
            category: req.body.category,
            description: req.body.description,
            user_id: req.body.user_id,
            status: 'รอดำเนินการ'
        }

        // ถ้ามีการอัปโหลดไฟล์สำเร็จ multer จะใส่ข้อมูลไว้ใน req.file
        if (req.file) {
            repairData.image = req.file.filename
        }
        
        const repair = await RepairRequest.create(repairData)
        res.send(repair)
    } catch (err) {
        console.log(err) // ดู Error ใน Terminal ของ Server
        res.status(500).send({ error: 'เกิดข้อผิดพลาดในการสร้างใบแจ้งซ่อม' })
    }
},

    // 5. ลบใบแจ้งซ่อม (สำหรับ Admin ลบรายการที่ผิด)
    async remove(req, res) {
        try {
            const repair = await RepairRequest.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!repair) {
                return res.status(403).send({ error: 'ไม่พบใบแจ้งซ่อมนี้' })
            }
            await repair.destroy()
            res.send(repair)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการลบข้อมูล' })
        }
    }
}