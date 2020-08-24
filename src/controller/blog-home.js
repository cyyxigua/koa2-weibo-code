/**
 * @description 首页 controller
 * @author cyy
 */

const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constants')

/**
 * 创建微博
 * @param {number} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片
 */
async function create({userId, content, image}) {
  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content,
      image
    })
    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId 用户id
 * @param {number} pageIndex 当前页
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList(
    {
      userId, 
      pageIndex, 
      pageSize: PAGE_SIZE
    }
  )
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
  create,
  getHomeBlogList
}