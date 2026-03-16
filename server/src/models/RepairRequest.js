module.exports = (sequelize, DataTypes) => {
    const RepairRequest = sequelize.define('RepairRequest', {
        user_id: { type: DataTypes.INTEGER },
        room_number: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        status: { type: DataTypes.STRING, defaultValue: 'รอดำเนินการ' },
        image: { type: DataTypes.STRING } // เพิ่มฟิลด์นี้สำหรับเก็บชื่อไฟล์รูป
    });

    return RepairRequest;
};