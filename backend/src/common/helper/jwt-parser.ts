import jwt from 'jsonwebtoken'
import Koa from 'koa'
import conf from '../../config'


const getUsernameFromToken = (token: string) => {
  try {
    const { username } : any = jwt.verify(token, conf.jwtSecret)
    return username
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const { username } : any = jwt.decode(token)
      return username
    }
    return null
  }
}

const jwtParser = () => async (
  ctx: Koa.Context,
  next: any,
): Promise<void> => {
  const authorization: string = ctx.request.headers.authorization
  console.log(authorization , 'authorization')
  if (!authorization) {
    ctx.state.isUserLogin = false
    return next()
  }
  const token: string = authorization.split(' ')[1]
  try {
    const jwtData: any = jwt.verify(token, conf.jwtSecret)
    ctx.state.isUserLogin = true
    ctx.state.username = jwtData.username
    ctx.state.userRole = jwtData.role
    return next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const jwtData: any = jwt.decode(token)
      ctx.state.isUserLogin = false
      ctx.state.username = jwtData.username
      ctx.state.userRole = jwtData.role
      return next()
    }
    ctx.throw(409)
  }
}

export { getUsernameFromToken }

export default jwtParser