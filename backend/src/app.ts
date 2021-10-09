import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import rootRouter from './routes'
// import jwtParser from './common/helper/jwt-parser'
// import logger from './common/helper/logging'
// import db from './common/connection'

const app = new Koa()

app.use(helmet())
app.use(cors())
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}))
// app.use(jwtParser())
// app.use(logger())
app.use(rootRouter.routes())

// app.context.db = db

export default app