const router = require('koa-router')()
let Model = require('../db/models/categoryFilterList');
router.prefix('/api/categoryFilterList')

router.get('/',function(ctx,next){
    ctx.body = 'this is a categories response!'
})

router.post('/find',async function (ctx,next) {
    const categoryFilterList = await Model.findAll({})
    // console.log("blogs数据",categoryFilterList)
    ctx.body = {
        code:200,
        data:categoryFilterList
    }
})

router.post('/add',async function (ctx,next) {
    const category = await Model.create(ctx.request.body)
    ctx.body = {
        code:200,
        data:category
    }
})

router.post('/remove',async function (ctx,next) {
    console.log(ctx.request.body.id)
    await Model.destroy({
        where:{
            id:ctx.request.body.id
        }
    })
    ctx.body = 'success'
})

module.exports = router
