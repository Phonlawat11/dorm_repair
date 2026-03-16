module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: { type: DataTypes.STRING }, // ชื่อ
        lastname: { type: DataTypes.STRING }, // นามสกุล
        email: { type: DataTypes.STRING, unique: true }, // อีเมล (ใช้ล็อกอิน)
        password: { type: DataTypes.STRING }, // รหัสผ่าน
        room_number: { type: DataTypes.STRING }, // เลขห้อง
        role: { type: DataTypes.STRING, defaultValue: 'user' } // สถานะ (user หรือ admin)
    });

    return User;
};