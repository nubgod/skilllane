import { CustomModel, DataTypes } from '../common/helper/sequelize'
import sequelize from '../common/connection'
import { Auth } from '../common/models'
// import { Party, JoinParty } from '../party/models'

class User extends CustomModel {
  public auth!: string
  public firstName: string
  public lastName: string
  public nickName: string
  public birthDay: Date
  public gender: string
  public role: string

  public readonly createdAt!: Date
}

User.init(
  {
    auth: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'common_auth',
        key: 'username',
      },
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: 'first_name',
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: 'last_name',
    },
    nickName: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: 'nick_name',
    },
    birthDay: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'birth_day',
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      field: 'gender',

    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: 'user',
    timestamps: true,
    updatedAt: false,
  }
)

User.belongsTo(Auth, { foreignKey: 'auth' })


export { User }
