const router = require('koa-router')()
var filesActive = require('../modules/files')
const checkToken = require('../token/checkToken')


router.prefix('/game')
router.post('/list', checkToken, async (ctx, next) => {
  filesActive.findAllPicture()
  ctx.body = {
    imageInfo: [
      {
        url: 'images/' + '1.jpg',
        introduce: '这是测试图片'
      },
      {
        url: 'images/' + '2.jpg',
        introduce: '这是测试图片'
      },
      {
        url: 'images/' + '3.jpg',
        introduce: '这是测试图片'
      },
      {
        url: 'images/' + '4.jpg',
        introduce: '这是测试图片'
      },
      {
        url: 'images/' + '5.jpg',
        introduce: '这是测试图片'
      },
    ]
  }

})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
