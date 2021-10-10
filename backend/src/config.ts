interface IConfig {
  port: number
  apiPrefix: string
  debug: boolean
  jwtSecret: string
  jwtExpiresTime: number
  paginationSize: number
  databaseUrl: string
}

const config: IConfig = {
  port: +process.env.PORT || 3000,
  apiPrefix: 'api',
  debug: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  jwtExpiresTime: process.env.NODE_ENV !== 'production'
    ? 60 * 60 * 1000 // 1000 hours
    : 60 * 5, // 5 min
  paginationSize: 10,
  databaseUrl: process.env.DATABASE_URL || 'postgres://skilllane:password@db.skilllane:5432/skilllane',
  // databaseUrl: process.env.DATABASE_URL || 'postgres://skilllane:password@localhost:5432/skilllane',

}

export default config