const router = require('koa-router')()
let Model = require('../db/models/blog');
router.prefix('/api/blog')

router.get('/',function(ctx,next){
    ctx.body = 'this is a blogs response!'
})

router.post('/add',async function (ctx,next){
    console.log('========================')
    console.log(ctx.toString())
    const blog = await Model.create(ctx.request.body)
    ctx.body = {
        code:200,
        data:blog
    }
})

// 查询
//
// {
//     "page":{
//     "size":3,
//         "index":0
// },
//     "form":{
//     "category":"front"
// }
// }

// 查询分类
router.post('/find',async function (ctx,next){
    console.log('ctx.request.body',ctx.request.body)
    let {page,form} = ctx.request.body
    console.log(page)
    let options = {}
    if(form.category!=="all"){
        options.where = form
    }
    if(page){
        options.offset = (page.index)*page.size
        options.limit = page.size
    }
    let list = await Model.findAll(options)
    ctx.body = {
        code:200,
        data:list
    }
})


router.post('/update', async function (ctx, next) {
    console.log(ctx.request.body)
    let pbj = await Model.update({ id: ctx.request.body.id }, ctx.request.body);
    ctx.body = pbj
})

// router.post('/delete',async function(ctx,next){
//     await Model.destroy({
//         where:{id:ctx.request.body.id}
//     })
//     ctx.body = "success"
// })

router.post('/delete', async function (ctx, next) {
    console.log(ctx.request.body)
    await Model.destroy({
        where: {
            id : ctx.request.body.id
        }
    });
    ctx.body = 'success '
})

module.exports = router
