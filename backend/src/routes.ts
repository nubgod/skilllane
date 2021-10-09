import Router from 'koa-router'
// import customerRouter from './customer/routes'
// import commonRouter from './common/routes'
// import partyRouter from './party/routes'

import conf from './config'

const rootRouter = new Router({ prefix: `/${conf.apiPrefix}` })
rootRouter.get('/hello', ctx => {
    console.log("TEST")
    ctx.status = 200
})
// rootRouter.use('/customer', customerRouter.routes(), customerRouter.allowedMethods())
// rootRouter.use('/common', commonRouter.routes(), commonRouter.allowedMethods())
// rootRouter.use('/parties', partyRouter.routes(), partyRouter.allowedMethods())

export default rootRouter