import { IUser } from './user.interface'

export interface ICourse {
    id: string
    name: string
    subject: string
    description?: string
    category: string
    image: string
    startDate: string
    endDate: string
    createdBy: string
    createdAt: Date
    user?: IUser
}