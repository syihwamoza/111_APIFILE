module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define("Komik", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        judul: { //VARCHAR
            type: DataTypes.STRING,
            allowNull: false
        },
        penulis: { //VARCHAR
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsi: { //TEXT
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageType : DataTypes.STRING,
        imageName : DataTypes.STRING,
        imageData : DataTypes.BLOB('long'),
    }, {
        tableName: "komik"
    });
    return komik;
};