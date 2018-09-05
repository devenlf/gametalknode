const router = require('koa-router')()
var filesActive = require('../modules/files')
const checkToken = require('../token/checkToken')


router.prefix('/game')
router.post('/list', async (ctx, next) => {
  let token = ctx.request.header['token']
  let user_Id =await checkToken(token).user_id;
  return

})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
