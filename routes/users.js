const router = require('koa-router')()
const createToken = require('../token/createToken')
const User = require('../db/userInfo')

function insert() {
 
  var user = new User({
    nackname: "李飞",
    username: "ds",                    //用户账号
    userpwd: "4564646",                        //密码
    email: "1824646@qq.com",                        //年龄
    phone: "4646464346"                     //最近登录时间
  });

  user.save(function (err, res) {

      if (err) {
          console.log("Error:" + err);
      }
      else {
          console.log("Res:" + res);
      }

  });
}
insert()

router.prefix('/users')

router.post('/login', function (ctx, next) {
  if(!ctx.request.body.username||!ctx.request.body.password){
    ctx.body={
      message:'用户名或者密码不得为空',
      state:0
    }
    return
  }else{
    if(ctx.request.body.username==='lifei'&&ctx.request.body.password==='123456'){
      let token = createToken('1')
      ctx.body={
        message:'登录成功',
        name: "李飞",
        userId:1,
        token: token,
        state:2
      }
    }else{
      ctx.body={
        message:'用户名密码不正确',
        state:1
      }
    }
  }
})

router.post('/register',function(ctx,next){
  console.log(ctx.request.body)
  ctx.body={
    message:"你等一会"
  }
})

router.post('/bar', function (ctx, next) {
  
})

module.exports = router
