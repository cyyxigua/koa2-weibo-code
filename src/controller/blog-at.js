/**
 * @description 微博 @ 关系 controller
 * @author cyy
 */

const { getAtRelationCount, getAtUserBlogList } = require('../services/at-relation')
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

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}