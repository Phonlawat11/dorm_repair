module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'dormrepair',
        user: process.env.DB_USER || 'dormrepair',
        password: process.env.DB_PASSWORD || 'dormrepair',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './dormrepair-db.sqlite' // ชื่อไฟล์ฐานข้อมูลที่จะถูกสร้างขึ้นมา
        }
    }
}