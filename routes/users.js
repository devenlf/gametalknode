const router = require('koa-router')()
const createToken = require('../token/createToken')
const User = require('../db/userInfo')
const uuid = require('uuid');

router.prefix('/users')

router.post('/login', async function (ctx, next) {
  if (!ctx.request.body.username || !ctx.request.body.password) {
    ctx.body = {
      message: '用户名或者密码不得为空',
      state: 0
    }
    return
  } else {
    let requestData = ctx.request.body
    var wherestr = { 'username': requestData.username };
    let userResult = await User.find(wherestr)
    if (userResult.length === 0) {
      ctx.body = {
        message: '用户名不存在',
        state: 0
      }
    } else if (userResult.length > 0) {
      if(userResult[0].userpwd===requestData.password) {
        switch(userResult[0].grade){
          case 0:
          ctx.body={
            message: '登陆成功',
            name:userResult[0].nickname,
            token: createToken(userResult[0].userId),
            state: 1,
            level: 0,
          }
          break;
          case 1:
          ctx.body={
            message: '管理员登陆成功',
            name:userResult[0].nickname,
            token: createToken(userResult[0].userId),
            state: 1,
            level: 1,
          } 
        }
      }else{
        ctx.body={
          message: '密码错误',
          state: 0
        }
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
      message: "用户名存在",
      status: 1
    }
    return
  }
  let user_ID = await addUserInfo(requestData)
  ctx.body = {
    status: 0,
    scucces: true,
    message: "注册成功",
    token: createToken(user_ID),
    nickname: requestData.nickname
  }
  return
})

router.post('/bar', function (ctx, next) {

})

//插入数据
function addUserInfo(data) {
  console.log(data)
  let userId = uuid.v1()
  var user = new User({
    nickname: data.nickname,
    username: data.username,                    //用户账号
    userpwd: data.password,                        //密码
    email: data.Email,                        //年龄
    phone: data.phone,                    //最近登录时间
    userId: userId,
    grade : 0
  });
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  });
  return userId
}



module.exports = router
