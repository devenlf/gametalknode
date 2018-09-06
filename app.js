const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const checkToken = require('./token/checkToken')


const game = require('./routes/game')
const gameSet = require('./routes/gameSet')
const users = require('./routes/users')
const colationApi = [
  '/users/login', '/users/register'
]

const staticSource = /^(\/uploads)/;
// error handler
onerror(app)


app.use(cors())

//验证token时效性
app.use(async (ctx, next) => {
  if (colationApi.indexOf(ctx.request.url) === -1) {
    //过滤掉图片访问
    if (staticSource.test(ctx.request.url)) {
      return next()
    }
    let token = ctx.request.header['token']
    try {
      await checkToken(token)
      await next()
    } catch (err) {
      ctx.response.status = 403;
      ctx.response.body = '登录信息过期，请重新登陆'
    }
  } else {
    await next()
  }
});

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(game.routes(), game.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(gameSet.routes(), gameSet.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
