import Koa from 'koa'
import Winston from 'winston'


const winston = (() => {
  Winston.configure({
    format: Winston.format.combine(
      Winston.format.colorize(),
      // Winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      // Winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      Winston.format.printf((info : any) => `${info.level}: ${info.message}`),
    ),
    transports: [ new Winston.transports.Console() ],
  })
  return Winston
})()

export { winston }

export default () => {
  return async(ctx: Koa.Context, next: any): Promise<any> =>  {
    const start = new Date()
    await next()
    if(ctx.originalUrl === '/api/healthz') {
      return null
    }
    
    const ms = new Date().valueOf() - start.valueOf()
    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else if (ctx.status >= 100) {
      logLevel = 'info'
    }
    const detail = ctx.state.log ? ` ${ctx.state.log}` : '' 
    const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms${detail}`.replace(/(\r\n|\n|\r)/gm, '')
    winston.log(logLevel, msg)
  }
}
