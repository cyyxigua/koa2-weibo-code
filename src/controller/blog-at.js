/**
 * @description 微博 @ 关系 controller
 * @author cyy
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constants')

/**
 * 获取 @ 我的微博数量
 * @param {number} userId 用户 ID 
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId 用户 ID 
 * @param {number} pageIndex 当前页
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({userId, pageIndex, PAGE_SIZE})
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

/**
 * 标记为已读
 * @param {number} userId 用户 ID
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation(
      { newIsRead: true },
      { userId, isRead: false }
    )
  } catch (error) {
    console.error(error)
  }
  // 不需要返回 SuccessModel 或者 ErrorModel，因为是在页面渲染之后调用的
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}