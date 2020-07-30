/**
 * @description 登录验证的中间件
 * @author cyy
 */

const { ErrorModel } = require('../model/ResModel')
const {loginCheckFailInfo} = require('../model/ErrorInfo')

/**
 * API 登录验证
 * @param {Objext} ctx ctx
 * @param {function} next next
 */
async function loginChexk(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Objext} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录则跳转到登录页，并且登陆成功后跳转回之前的页面
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginChexk,
  loginRedirect
}