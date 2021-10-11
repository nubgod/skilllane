import Koa from 'koa'
import { User } from './models'
import { Auth } from '../common/models'
import { isLogin } from '../common/helper/koa-decorators'

export class Controller {
  public async signUp(ctx: Koa.Context) {
    const { username, password, firstName, lastName, nickName, birthDay, gender, role }: any = ctx.request.body
    const auth: Auth = await Auth
      .createUser({ username, password, role })
      .catch(err => ctx.throw(400, err))
    const user: User = User.build()
    user.auth = auth.username
    user.firstName = firstName
    user.lastName = lastName
    user.nickName = nickName
    user.birthDay = birthDay
    user.gender = gender
    await user.save()
    ctx.status = 201
    ctx.body = user.get()
  }

  public async signIn(ctx: Koa.Context) {
    const { username, password }: any = ctx.request.body
    const user: User = await User.findByPk(username)
    ctx.assert(user, 400, 'username or password incorrect')
    const auth = await Auth.authenticate(username, password).catch((err) =>
      ctx.throw(400, err)
    )
    const authToken = await auth.signIn()
    await user.save()
    ctx.body = await auth.getAccessToken(authToken.token)
  }

  @isLogin()
  public async editProfile(ctx: Koa.Context) {
    const { firstName, lastName, nickName, birthDay, gender }: any = ctx.request.body
    // const user: User = await User.findByPk(ctx.state.username ?? 'nubtest')
    // await User.update(user,{
    //   'first_name': firstName,
    //   lastName,
    //   nickName,
    //   birthDay,
    //   gender,
    // })
    console.log(ctx.state.username , 'ctx.state.username')
    await User.update({
      firstName,
      lastName,
      nickName,
      birthDay,
      gender 
    }, {
      where: {
        auth: ctx.state.username
      }
    })
    ctx.body = 'success'
    // await update.save()
  }

  @isLogin()
  public async profile(ctx: Koa.Context) {
    const user: User = await User.findByPk(ctx.state.username ?? 'nubtest')
    await user.save()
    ctx.body = user.get()
  }
}
