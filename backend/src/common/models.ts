import bcrypt from 'bcryptjs'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import conf from '../config'
import sequelize from './connection'
import { CustomModel, DataTypes, Op } from './helper/sequelize'
import { validateEmail } from './helper/validate';

class Auth extends CustomModel {
  public username!: string
  public password!: string
  public role!: 'student' | 'instructor'
  public isLocked!: boolean
  public readonly createdAt!: Date

  static async hashPasswowrd(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync())
    return passwordHash
  }

  static async comparePasswowrd(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    const isPassword = await bcrypt.compare(password, passwordHash)
    return isPassword
  }

  static async createUser({
    username,
    password,
    role= 'student',
  }: any): Promise<Auth> {
    if (!/^[A-Za-z0-9]{6}/.test(password)) {
      throw new Error(
        'กรุณากรอกรหัสผ่านที่ประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลขอย่างน้อย 6 ตัวอักษร'
      )
    }
    const passwordHash = await this.hashPasswowrd(password)
    const [user, created] = await this.findOrCreate({
      where: { username },
      defaults: { username, role, password: passwordHash },
    })
    if (!created) {
      throw new Error(`username ${username} is already exist`)
    }
    return user
  }

  static async authenticate(username: string, password: string): Promise<Auth> {
    const user: Auth = await this.findByPk(username)
    if (!user) {
      throw new Error('username or password incorrect')
    }
    const isPassword = await this.comparePasswowrd(password, user.password)
    if (!isPassword) {
      throw new Error('username or password incorrect')
    }
    return user
  }

  async signIn(): Promise<AuthToken> {
    const refreshToken = randToken.generate(128)
    const authToken = AuthToken.build()
    authToken.auth = this.username
    authToken.active = true
    authToken.token = refreshToken
    await authToken.save()
    return authToken
  }

  async signOut(refreshToken: string): Promise<void> {
    const authToken = await AuthToken.findOne({
      where: { token: refreshToken },
    })
    if (authToken) {
      authToken.active = false
      await authToken.save()
    }
  }

  async getAccessToken(refreshToken: string): Promise<any> {
    const authToken = await AuthToken.findOne({
      where: {
        auth: this.username,
        token: refreshToken,
        active: true,
      },
    })
    if (!authToken) {
      throw new Error('not found refresh token')
    }
    await authToken.save()
    const accessToken = jwt.sign(this.getJWTData(), conf.jwtSecret, {
      expiresIn: conf.jwtExpiresTime,
    })
    const expiresIn = new Date()
    expiresIn.setMilliseconds(expiresIn.getMilliseconds() + conf.jwtExpiresTime)
    return { refreshToken, accessToken, role: this.role, expiresIn, username: this.username }
  }

  getJWTData(): any {
    return { username: this.username, role: this.role  }
  }
}

Auth.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'instructor'),
      allowNull: false,
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      field: 'is_locked',
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: 'common_auth',
    timestamps: true,
    updatedAt: false,
  }
)

class AuthToken extends CustomModel {
  public id!: number
  public auth!: string
  public active: boolean
  public token: string
  public createdAt: Date
}
AuthToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    auth: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'common_auth',
        key: 'username',
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: 'common_auth_token',
    timestamps: true,
    updatedAt: false,
  }
)

export { Auth, AuthToken  }