/**
 * @description 微博 @ 用户关系 service
 * @author cyy
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量（未读）
 * @param {number} userId 用户 id
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

module.exports = {
  createAtRelation,
  getAtRelationCount
}