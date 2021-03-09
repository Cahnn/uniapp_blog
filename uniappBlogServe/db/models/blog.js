const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql');

class Blog extends Model {}

Blog.init({
    // 在这里定义模型属性
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    category: {
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
    modelName: 'Blog' // 我们需要选择模型名称
});

// 定义的模型是类本身
module.exports = Blog


