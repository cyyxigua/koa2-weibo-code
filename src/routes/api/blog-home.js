/**
 * @description 首页 API 路由
 * @author cyy
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const xss = require('xss')
const { genValidator } = require('../../middlewares/validator')
const blogValidator = require('../../validator/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidator), async(ctx, next) => {
  const {content, image} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await create({
    userId,
    content: xss(content),
    image
  })
})

module.exports = router