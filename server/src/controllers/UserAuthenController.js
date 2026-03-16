const { User } = require('../models')

module.exports = {
    // 1. สมัครสมาชิก (Register)
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'อีเมลนี้ถูกใช้งานแล้ว หรือส่งข้อมูลมาไม่ถูกต้อง'
            })
        }
    },

    // 2. เข้าสู่ระบบ (Login)
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email: email }
            })

            // เช็คว่ามีอีเมลนี้ในระบบไหม
            if (!user) {
                return res.status(403).send({ error: 'ไม่พบผู้ใช้งานนี้ในระบบ' })
            }

            // เช็ครหัสผ่าน (เวอร์ชันเบื้องต้นใช้การเปรียบเทียบตรงๆ)
            if (password !== user.password) {
                return res.status(403).send({ error: 'รหัสผ่านไม่ถูกต้อง' })
            }

            // ถ้าถูกต้องทั้งหมด ส่งข้อมูล User กลับไปให้หน้าเว็บ
            res.send({
                user: user,
                message: 'เข้าสู่ระบบสำเร็จ'
            })
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' })
        }
    }
}