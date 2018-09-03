const router = require('koa-router')()
const createToken = require('../token/createToken')
const User = require('../db/userInfo')

router.prefix('/users')

router.post('/login', function (ctx, next) {
  if (!ctx.request.body.username || !ctx.request.body.password) {
    ctx.body = {
      message: '用户名或者密码不得为空',
      state: 0
    }
    return
  } else {
    if (ctx.request.body.username === 'lifei' && ctx.request.body.password === '123456') {
      let token = createToken('1')
      ctx.body = {
        message: '登录成功',
        name: "李飞",
        userId: 1,
        token: token,
        state: 2
      }
    } else {
      ctx.body = {
        message: '用户名密码不正确',
        state: 1
      }
    }
  }
})

router.post('/register', async function (ctx, next) {
  let requestData = ctx.request.body
  var wherestr = { 'username': requestData.username };
  let userResult = await User.find(wherestr)
  if (userResult.length > 0) {
    ctx.body = {
      scucces: false,
      message: "用户名存在"
    }
    return
  }
  await addUserInfo(requestData)
  ctx.body = {
    scucces: true,
    message: "注册成功"
  }
  return
})

router.post('/bar', function (ctx, next) {

})

//插入数据
function addUserInfo(data) {
  var user = new User({
    nackname: data.nackname,
    username: data.username,                    //用户账号
    userpwd: data.password,                        //密码
    email: data.Email,                        //年龄
    phone: data.phone                     //最近登录时间
  });
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  });
}



module.exports = router
