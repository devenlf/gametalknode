const router = require('koa-router')()

router.prefix('/users')

router.post('/login', function (ctx, next) {
  let time = new Date();
  if(!ctx.request.body.username||!ctx.request.body.password){
    ctx.body={
      message:'用户名或者密码不得为空',
      state:0
    }
    return
  }else{
    if(ctx.request.body.username==='lifei'&&ctx.request.body.password==='123456'){
      ctx.body={
        message:'登录成功',
        name: "李飞",
        token: time,
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

router.post('/bar', function (ctx, next) {
  
})

module.exports = router
