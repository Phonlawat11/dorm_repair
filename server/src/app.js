const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// ทำให้โฟลเดอร์ public/uploads สามารถเข้าถึงได้ผ่าน URL (เช่น http://localhost:8081/uploads/ชื่อรูป.jpg)
app.use('/uploads', express.static('public/uploads'))

require('./routes')(app)

sequelize.sync({ force: false }).then(() => {
    app.listen(config.port, () => {
        console.log(`🚀 Server เปิดทำงานแล้วที่พอร์ต ${config.port}`)
    })
})