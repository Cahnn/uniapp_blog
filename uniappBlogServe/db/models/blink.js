const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql');

class blink extends Model {}

blink.init({
    // 在这里定义模型属性
    text: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    photo: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    tag: {
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
    modelName: 'blink' // 我们需要选择模型名称
});

// 定义的模型是类本身
module.exports = blink
