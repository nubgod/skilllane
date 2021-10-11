import axios from 'axios'
import { ICourse } from '../interfaces/course.interface'
import localState from '../utils/local-state'

const bearerFormat = (accessToken: string) => `Bearer ${accessToken}`

const webAPI = () => {
  const server = axios.create()
  const { accessToken } = localState.load()
  if (accessToken) {
    server.defaults.headers.common['Authorization'] = bearerFormat(accessToken)
  }
  server.interceptors.response.use(
    (response) => ({ ...response, err: false }),
    (error) => {
      if (error.response.status === 409) {
        localState.clean()
        window.location.href = '/'
      }
      if (error.response.status === 401) {
        return server
          .get('/api/common/refresh-access-token', {
            headers: { refreshtoken: localState.load().refreshToken },
          })
          .then((res) => {
            localState.save(res.data)
            error.config.headers['Authorization'] = bearerFormat(
              res.data.accessToken
            )
            server.defaults.headers.common['Authorization'] = bearerFormat(
              res.data.accessToken
            )
            return server.request(error.config)
          })
      }
      return { ...error.response, err: true }
    }
  )

  return {
    login: async (username: string, password: string) => {
      return server.post('/api/user/sign-in', { username, password })
    },
    register: async (body: any) => {
      return server.post('/api/user/sign-up', body)
    },
    logout: async () => {
      return server.delete('/api/common/logout', {
        headers: { refreshtoken: localState.load().refreshToken },
      })
    },
    getCourses: async (search?: string, startDate?: any, endDate?: any) => {
      return server.get(`/api/courses?search=${search}&startDate=${startDate}&endDate=${endDate}`)
    },
    createCourse: async (body: ICourse) => {
      return server.post(
        `/api/courses`
      , body)
    },
    editProfile: async (body: any) => {
      return server.patch(
        `/api/user/profile`
      , body)
    },
    getProfile: async () => {
      return server.get(`/api/user/profile`)
    },
  }
}

export default webAPI()
