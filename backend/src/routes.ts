import Router from 'koa-router'
import userRouter from './user/routes'
import courseRouter from './course/routes'
import commonRouter from './common/routes'
// import partyRouter from './party/routes'

import conf from './config'

const rootRouter = new Router({ prefix: `/${conf.apiPrefix}` })
rootRouter.get('/hello', ctx => {
    ctx.status = 200
})
rootRouter.use('/user', userRouter.routes(), userRouter.allowedMethods())
rootRouter.use('', courseRouter.routes(), courseRouter.allowedMethods())
rootRouter.use('/common', commonRouter.routes(), commonRouter.allowedMethods())


export default rootRouter