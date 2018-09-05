const router = require('koa-router')()
const checkToken = require('../token/checkToken')


router.prefix('/game')
router.post('/list', async function (ctx, next) {
  let token = ctx.request.header['token']
  try {
    await checkToken(token);
    ctx.body={
      status:1
    }
  }catch(err){
    ctx.body={
      status:0
    }
  }
  return
})


module.exports = router
