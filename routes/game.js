const router = require('koa-router')()
const GameList = require('../db/admin')
const GameReplies = require('../db/user')
const uuid = require('uuid');


//找到所有游戏列表数据
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

//找到当前游戏对应的帖子
const currentTiezi = (currenGameId) => {
  return new Promise((resizeTo, reject) => {
    GameReplies.find({ gameId: currenGameId }, (err, doc) => {
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

//发布帖子
router.post('/fabutiezi', async function (ctx, next) {
  let data = ctx.request.body
  let newImgUrl = []
  data.imageArray.forEach(img => {
    let newUrl = 'http://127.0.0.1:3000/uploads' + img
    newImgUrl.push(newUrl)
  })
  var user = new GameReplies({
    gameId: data.gameId,
    title: data.title,
    content: data.content,
    imageUrl: newImgUrl,
    date: new Date(),
    name: data.name,
    reviewId: uuid.v1()
  });
  await user.save(function (err, res) {
    if (err) {
      throw err
    } else {
      console.log("帖子内容添加成功")
    }
  })
  ctx.body = {
    state: 1,
    message: "帖子发布成功"
  }
})





module.exports = router
