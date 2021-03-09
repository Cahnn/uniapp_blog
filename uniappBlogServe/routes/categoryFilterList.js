const router = require('koa-router')()
let Model = require('../db/models/categoryFilterList');
router.prefix('/api/categoryFilterList')

router.get('/',function(ctx,next){
    ctx.body = 'this is a categories response!'
})

router.post('/find',async function (ctx,next) {
    const categoryFilterList = await Model.findAll({})
    console.log("blogs数据",categoryFilterList)
    ctx.body = {
        code:200,
        data:categoryFilterList
    }
})

module.exports = router
