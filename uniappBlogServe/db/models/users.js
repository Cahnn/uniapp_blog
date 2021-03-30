const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql');

class Users extends Model {}

Users.init({
    // 在这里定义模型属性
    account: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    nickname: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    login_at: {
        type: DataTypes.DATE
        // allowNull 默认为 true
    },
    token: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    topImage: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    birthday: {
        type: DataTypes.DATE
        // allowNull 默认为 true
    },
    sex: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    updatedAt: {
        type: DataTypes.DATE
        // allowNull 默认为 true
    },
    createdAt: {
        type: DataTypes.DATE
        // allowNull 默认为 true
    },
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Users' // 我们需要选择模型名称
});

// 定义的模型是类本身
module.exports = Users
