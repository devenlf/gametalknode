const router = require('koa-router')()

router.prefix('/game')

router.post('/list', async (ctx, next) => {
  ctx.body = {

  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
