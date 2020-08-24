/**
 * @description 微博 service
 * @author cyy
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 创建微博
 * @param {number} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片
 */
async function createBlog({userId, content, image}) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 每页显示微博数
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpts = {}
  if(userName) {
    userWhereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })
  // result.count 是总数，跟分页无关
  // result.rows 查询结果，数组

  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取关注者的微博列表
 * @param {number} userId 用户 ID
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 每页显示微博数
 */
async function getFollowersBlogList({userId, pageIndex = 0, pageSize = 10}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })
  // result.count 是总数，跟分页无关
  // result.rows 查询结果，数组

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatUser(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}