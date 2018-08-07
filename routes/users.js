const router = require('koa-router')()

router.prefix('/users')

router.post('/login', function (ctx, next) {
  let time = new Date();
  ctx.body = {
    name: "李飞",
    token: time
  }
})

router.post('/bar', function (ctx, next) {
  
})

module.exports = router
