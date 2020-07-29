/**
 * @description user controller
 * @author cyy
 */

const {getUserInfo} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo} = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  // 业务逻辑处理
  // 调用 services 获取数据
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 用户信息已存在
    return new SuccessModel(userInfo)
  } else {
    // 用户信息不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 统一返回格式
}

module.exports = {
  isExist
}