const router = require('koa-router')()
const GameList = require('../db/admin')


const findAllData = () => {
  return new Promise((resolve, reject) => {
    GameList.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

router.prefix('/game')
router.post('/list', async function (ctx, next) {
  let page = ctx.request.body.page;
  let row = ctx.request.body.row;
  let gamelistData = await findAllData();
  let currentData = gamelistData.slice(page * row, (page + 1) * row)
  ctx.body = {
    gameList: currentData
  }
})


module.exports = router
