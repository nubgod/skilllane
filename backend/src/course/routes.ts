import Router from 'koa-router'
import { Controller } from './controllers'

const router = new Router()
const controller = new Controller()

router.post('/courses', controller.createCourse)
router.get('/courses', controller.getCourses)


export default router