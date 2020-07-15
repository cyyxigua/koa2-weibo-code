/**
 * @description json test
 * @author cyy
 */

const server = require('./server')

test('json接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({  // toEqual判断对象是不是相等
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')

    // const postRes = await (await server.post('./login')).setEncoding({
    //     username: 'zhangsan',
    //     password: '123'
    // })
})