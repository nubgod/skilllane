import Koa from 'koa'
import { body, isLogin } from './helper/koa-decorators'
import { Auth } from './models'

export class Controller {

    @isLogin()
    public async signOut(ctx: Koa.Context) {
      const user: Auth = await Auth.findByPk(ctx.state.username)
      await user.signOut(ctx.request.header.refreshtoken + '')
      ctx.body = `successfully deleted refresh access token: ${ctx.request.header.refreshtoken}`
    }

    public async refreshAccesstoken(ctx: Koa.Context) {
        const user: Auth = await Auth.findByPk(ctx.state.username)
        ctx.assert(user && !user.isLocked, 409)
        try {
          ctx.body = await user.getAccessToken(ctx.request.header.refreshtoken + '')
        } catch (err) {
          ctx.throw(409, err)
        }
      }

}