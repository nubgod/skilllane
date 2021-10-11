import Koa from 'koa'
import { Op } from 'sequelize'
import { isLogin } from '../common/helper/koa-decorators'
// import { User } from './models'
import { Auth } from '../common/models'
import { User } from '../user/models'
import { Course } from './models'

export class Controller {

  // @isLogin()
  public async getCourses(ctx: Koa.Context) {
    console.log(await Course.findAll({ include: ['user']}) , "COURSEEE")
    const { startDate, endDate, search }: any = ctx.request.query
    let query:any = {
      include: ['user'],
      where: {},
    }
    if (search) {
      query['where'] = Object.assign(query['where'], {
        [Op.or]: {
          category: {
            [Op.iLike]: `%${search}%`,
          },
          name: {
            [Op.iLike]: `%${search}%`,
          },
          subject: {
            [Op.iLike]: `%${search}%`,
          },
        }
        ,
      })
    }
    if (startDate && endDate) {
      query['where'] = Object.assign(query['where'], {
        [Op.or]: [
          {
            startDate: {
              [Op.gte]: startDate,
            },
            endDate: {
              [Op.lte]: endDate,
            },
          },
          {
            startDate: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
          {
            endDate: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        ],
      })
    }

    const courses: Course[] = await Course
      .findAll(query)
      .catch(err => ctx.throw(400, err))
    // ctx.status = 201
    ctx.body = courses
  }

  // @isLogin()
  public async createCourse(ctx: Koa.Context) {
    const { name, description, subject, category, image, startDate, endDate }: any = ctx.request.body
    const course: Course = Course.build()
    course.name = name
    course.description = description
    course.subject = subject
    course.category = category
    course.image = image
    course.startDate = startDate
    course.endDate = endDate
    course.createdBy = ctx.state.username || 'nubtest'
    await course.save()
    ctx.status = 201
    ctx.body = course.get()
  }
}
