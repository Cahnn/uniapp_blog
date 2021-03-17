const router = require('koa-router')()
let Model = require('../db/models/blink');
router.prefix('/api/blink')

router.get('/',function(ctx,next){
    ctx.body = 'this is a blink response!'
})

router.post('/find',async function (ctx,next) {
    const blinks = await Model.findAll({})
    ctx.body = {
        code:200,
        data:blinks
    }
})

router.post('/add',async function (ctx,next) {
    const blinks = await Model.create(ctx.request.body)
    ctx.body = {
        code:200,
        data:blinks
    }
})

router.post('/addImg',async function (ctx,next) {
    console.log(ctx.request.body)
    const photo = await Model.update({
        photo:ctx.request.body
    }, {
        where: {
            id: ctx.request.body.id
        }
    })
    ctx.body = {
        code:200,
        data:photo
    }
})

module.exports = router
