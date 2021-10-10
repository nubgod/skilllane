import { CustomModel, DataTypes } from '../common/helper/sequelize'
import sequelize from '../common/connection'
import { Auth } from '../common/models'
// import { Party, JoinParty } from '../party/models'

class Course extends CustomModel {
    public id: string
    public name: string
    public subject: string
    public description: string
    public category: string
    public image: string
    public startDate: string
    public endDate: string
    public createdBy: string


    public readonly createdAt!: Date
}

Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            field: 'id',

        },

        name: {
            allowNull: true,
            type: DataTypes.STRING(255),
            field: 'name',
        },
        subject: {
            allowNull: true,
            type: DataTypes.STRING(255),
            field: 'subject',
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT,
            field: 'description',
        },
        category: {
            allowNull: true,
            type: DataTypes.STRING(255),
            field: 'category',
        },
        image: {
            type: DataTypes.TEXT,
            field: 'image',

        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date',

        },
        endDate: {
            type: DataTypes.DATE,
            field: 'end_date',

        },
        createdBy: {
            type: DataTypes.STRING(255),
            field: 'created_by',
            allowNull: false,
            references: {
                model: 'common_auth',
                key: 'username',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
    },
    {
        sequelize,
        freezeTableName: true,
        tableName: 'course',
        timestamps: true,
        updatedAt: false,
    }
)

Course.belongsTo(Auth, { foreignKey: 'created_by' })

export { Course }
