/**
 * @description json schema 验证中间件
 * @author cyy
 */

const { ErrorModel } = require('../model/ResModel')
const {jsonSchemaFileInfo} = require('../model/ErrorInfo')

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validateFn(data)
    if(error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
    }
    // 验证成功，继续
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = {
  genValidator
}