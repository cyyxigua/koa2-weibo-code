/**
 * @description user service
 * @author cyy
 */

const { User } = require('../db/model/index')
const {formatUser} = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名 
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if(password) {
    Object.assign(whereOpt, {password})
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if(result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男，2 女，3 保密)
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result
}

/**
 * 从数据库中删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result 返回删除的行数
  return result > 0
}

/**
 * 更新用户信息
 * @param {*} param0 需要修改的内容 {newPassword, newNickName, newCity, newPicture}
 * @param {*} param1 查询条件 {userName, password}
 */
async function updateUser(
  {newPassword, newNickName, newCity, newPicture},
  {userName, password}
) {
  // 拼接修改内容
  const updateData = {}
  if(newPassword) updateData.password = newPassword
  if(newNickName) updateData.nickName = newNickName
  if(newCity) updateData.city = newCity
  if(newPicture) updateData.picture = newPicture
  // 拼接查询条件
  const whereData = {
    userName
  }
  if(password) whereData.password = password
  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0 // 修改的行数是否大于0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}