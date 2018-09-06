const router = require('koa-router')()
const multer = require('koa-multer');//加载koa-multer模块
const GameList = require('../db/admin')
const uuid = require('uuid');
const baseUrl="http://127.0.0.1:3000/uploads/"


//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });

//发布接口
router.prefix('/admin')

//路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})

router.post('/gamefabu', async (ctx, next) => {
  let data = ctx.request.body
  await addUserInfo(data)
  ctx.body = {
    status: 1,
    message: "上传成功"
  }
})

//插入数据
function addUserInfo(data) {
  let gameId = uuid.v1()
  var user = new GameList({
    gameName: data.name,
    gameDes: data.describe,                    //用户账号
    gameLink: data.link,                        //密码
    logoLink: baseUrl+data.logoname,                        //年龄  
    gameId: gameId,
    tieziNum: 0,
    liulanNum: 0
  });
  user.save(function (err, res) {
    if (err) {
      throw err
    } else {
      console.log("成功")
    }
  })
}



module.exports = router
