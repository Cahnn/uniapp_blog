const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql');

class Users extends Model {}

Users.init({
    // 在这里定义模型属性
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Users' // 我们需要选择模型名称
});

// 定义的模型是类本身
module.exports = Users
