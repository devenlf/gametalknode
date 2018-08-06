const router = require('koa-router')()

router.prefix('/users')

router.post('/login', function (ctx, next) {
  let time = new Date();
  ctx.body = {
    name: "李飞",
    token: time
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
