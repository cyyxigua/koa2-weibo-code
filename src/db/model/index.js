/**
 * @description 数据模型入口文件
 * @author cyy
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  foreginKey: 'userId'
})

module.exports = {
  User,
  Blog
}