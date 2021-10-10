import Koa from 'koa'
import { Model, Op, DataTypes, QueryTypes } from 'sequelize'
import conn from '../connection'
import conf from '../../config'

class CustomModel extends Model {
  static async findWithPage(ctx: Koa.Context, query: any = {}): Promise<any> {
    let pageSize = 0
    let pageCurrent = 0
    if (!ctx.request.query.nonePage) {
      const page = parseInt(ctx.request.query.page + '', 10) || 1
      pageSize =
        parseInt(ctx.request.query.pageSize + '', 10) || conf.paginationSize
      pageCurrent = page < 1 ? 1 : page
      query.offset = (pageCurrent - 1) * pageSize
      query.limit = pageSize
    }

    const { include, limit, offset, ...queryCount } = query
    const [rows, count] = await Promise.all([
      this.findAll(query),
      this.count(queryCount),
    ])

    return { pageCurrent, pageSize, count, rows }
  }
}

const whereAnd = (conditions: any[]) => {
  return conditions.reduce((sum, condition) => {
    if (
      typeof condition.column === 'undefined' ||
      typeof condition.value === 'undefined'
    ) {
      return sum
    }
    if (condition.op === 'or') {
      return {
        ...sum,
        [condition.column]: {
          [Op.or]: condition.value,
        },
      }
    }
    if (condition.op === 'not') {
      return {
        ...sum,
        [condition.column]: {
          [Op.not]: condition.value,
        },
      }
    }
    if (condition.op === 'substring') {
      return {
        ...sum,
        [condition.column]: {
          [Op.substring]: condition.value,
        },
      }
    }
    if (condition.op === 'gt') {
      return {
        ...sum,
        [condition.column]: {
          [Op.gt]: condition.value,
        },
      }
    }
    if (condition.op === 'gte') {
      return {
        ...sum,
        [condition.column]: {
          [Op.gte]: condition.value,
        },
      }
    }
    if (condition.op === 'lt') {
      return {
        ...sum,
        [condition.column]: {
          [Op.lt]: condition.value,
        },
      }
    }
    if (condition.op === 'lte') {
      return {
        ...sum,
        [condition.column]: {
          [Op.lte]: condition.value,
        },
      }
    }
    if (condition.op === 'between') {
      return {
        ...sum,
        [condition.column]: {
          [Op.between]: condition.value,
        },
      }
    }
    return {
      ...sum,
      [condition.column]: condition.value,
    }
  }, {})
}

export * from 'sequelize'

export { CustomModel, whereAnd, conn }
