/**
 * @description user controller
 * @author cyy
 */

const {getUserInfo, createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

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

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男，2 女，3 保密)
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 注册 serivice
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}