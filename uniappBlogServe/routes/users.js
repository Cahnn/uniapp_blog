const router = require('koa-router')()
let Model = require('../db/models/users');
router.prefix('/api/users')
const fileHandle = require("koa2-upload")
const COS = require("cos-nodejs-sdk-v5")

const serverUrl = `https://youhua-1301051630.cos.ap-chengdu.myqcloud.com`
const path = '/blog'

var cos = new COS({
  // 必选参数
  SecretId: 'AKIDBBF41I7zRcPsBiTnWzTTDgGZbM1jpJAm',
  SecretKey: 'Tn8CzevwjkUu3vPcXCaicyiAMCmkdyxu',
  // 可选参数
  FileParallelLimit: 1,    // 控制文件上传并发数
  ChunkParallelLimit: 8,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
  ChunkSize: 1024 * 1024 * 8,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
  Proxy: '',
});

async function putObject({Key, Body}) {
  await cos.putObject({
        Bucket: 'youhua-1301051630',
        Region: 'ap-chengdu',
        Key,  // 这里传入前缀
        Body
      }, function (err, data) {
        console.log(err || data);
        console.log('suc')
      }
  );
}


router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/find',async function (ctx,next) {
  const users = await Model.findAll({})
  ctx.body = {
    code:200,
    data:users
  }
})

router.post('/addImg', fileHandle({stream: true}), async (ctx, next) => {
  console.log("--------------------------------------------------------------------")
  console.log(ctx.files)
  const {name = new Date().getTime()} = ctx.request.headers
  // console.log(ctx.files)
  let fileName
  for (let i in ctx.files) {
    fileName = `${path}/image/${name}.jpg`
    let obj = await putObject({Key: fileName, Body: ctx.files[i].stream})
    console.log('obj', obj)
  }
  ctx.body = `${serverUrl}${fileName}`;
})

router.post('/modifyImg',async function (ctx,next) {
  let form = await Model.update(
      {
        topImage:ctx.request.body.topImage
      },
      {
        where:{
          id:ctx.request.body.id
        }
      })
  ctx.body = {
    code:200,
    data:form
  }
})

router.post('/modifyNickname',async function (ctx,next) {
  let form = await Model.update(
      {
        nickname:ctx.request.body.nickname
      },
      {
        where:{
          id:ctx.request.body.id
        }
      })
  ctx.body = {
    code:200,
    data:form
  }
})

router.post('/modifyBirthday',async function (ctx,next) {
  let form = await Model.update(
      {
        birthday:ctx.request.body.birthday
      },
      {
        where:{
          id:ctx.request.body.id
        }
      })
  ctx.body = {
    code:200,
    data:form
  }
})

router.post('/modifySex',async function (ctx,next) {
  let form = await Model.update(
      {
        sex:ctx.request.body.sex
      },
      {
        where:{
          id:ctx.request.body.id
        }
      })
  ctx.body = {
    code:200,
    data:form
  }
})

module.exports = router
