/**
 * @description 微博 service
 * @author cyy
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}