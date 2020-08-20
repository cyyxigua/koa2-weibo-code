/**
 * @description 用户关系 controller
 * @author cyy
 */

const { getUsersByFollower, addFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo } = require('../model/ErrorInfo')
 
/**
 * 根据 userId 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    fansList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}

module.exports = {
  getFans,
  follow
}