/**
 * @description 广场页 API 路由
 * @author cyy
 */

const router = require('koa-router')()
const { loginChexk } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginChexk, async(ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router