/**
 * @description 首页 API 路由
 * @author cyy
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create, getHomeBlogList } = require('../../controller/blog-home')
const xss = require('xss')
const { genValidator } = require('../../middlewares/validator')
const blogValidator = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')

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

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})


module.exports = router