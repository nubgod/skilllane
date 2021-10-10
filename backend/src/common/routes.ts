import Router from 'koa-router'
import { Controller } from './controllers'
// import asyncJobs from './helper/async-jobs'

const router = new Router()
const controller = new Controller()

router.delete('/logout', controller.signOut)
router.get('/refresh-access-token', controller.refreshAccesstoken)

export default router