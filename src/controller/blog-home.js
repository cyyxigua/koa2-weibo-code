/**
 * @description 首页 controller
 * @author cyy
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

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

module.exports = {
  create
}