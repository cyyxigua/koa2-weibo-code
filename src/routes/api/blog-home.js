/**
 * @description 首页 API 路由
 * @author cyy
 */

const router = require('koa-router')()
const { loginChexk } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginChexk, async(ctx, next) => {
  const {content, image} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await create({
    userId,
    content,
    image
  })
})

module.exports = router