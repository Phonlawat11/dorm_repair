const { User } = require('../models')

module.exports = {
    // 1. ดึงข้อมูลผู้ใช้งานทั้งหมด
    async index(req, res) {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน' })
        }
    },

    // 2. ดึงข้อมูลผู้ใช้งาน 1 คน (ตาม ID)
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            res.send(user)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    },

    // 3. แก้ไขข้อมูลผู้ใช้งาน
    async put(req, res) {
        try {
            await User.update(req.body, {
                where: { id: req.params.id }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' })
        }
    },

    // 4. ลบผู้ใช้งาน
    async remove(req, res) {
        try {
            const user = await User.findOne({ where: { id: req.params.id } })
            if (!user) {
                return res.status(403).send({ error: 'ไม่พบผู้ใช้งานนี้' })
            }
            await user.destroy()
            res.send(user)
        } catch (err) {
            res.status(500).send({ error: 'เกิดข้อผิดพลาดในการลบข้อมูล' })
        }
    }
}