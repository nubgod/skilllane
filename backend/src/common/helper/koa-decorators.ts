import Koa from 'koa'

export const isLogin = (role='student') => (target: any, name: any, descriptor: any) => {
  const original = descriptor.value

  descriptor.value = async (ctx: Koa.Context, next: any) => {
    ctx.assert(ctx.state.isUserLogin, 401)
    return original.call(this, ctx, next)
  }
  return descriptor
}

export const body =
  (schema: any) => (target: any, name: any, descriptor: any) => {
    const original = descriptor.value
    descriptor.value = async (ctx: Koa.Context, next: any) => {
      const { error } = schema.validate(ctx.request.body)
      if (error) {
        ctx.throw(400, error?.message)
      }
      return original.call(this, ctx, next)
    }
    return descriptor
  }
