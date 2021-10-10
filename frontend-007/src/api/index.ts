import axios from 'axios'
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
    register: async (username: string, password: string) => {
      return server.post('/api/customer/sign-up', { username, password })
    },
    logout: async () => {
      return server.delete('/api/common/logout', {
        headers: { refreshtoken: localState.load().refreshToken },
      })
    },
    getCourses: async (search?: string) => {
      return server.get(`/api/courses?search=${search}`)
    },
    getMyParties: async (customer: string, page: number, pageSize: number) => {
      return server.get(
        `/api/parties/party/${customer}?page=${page}&pageSize=${pageSize}`
      )
    },
    createParty: async (name: string, amount: number) => {
      return server.post('/api/parties/party', { name, amount })
    },
    joinParty: async (partyId: number) => {
      return server.post('/api/parties/join-party', { partyId })
    },
    cancelJoinedParty: async (partyId: number) => {
      return server.delete(`/api/parties/cancel-party/${partyId}`)
    },
    deleteParty: async (partyId: number) => {
      return server.delete(`/api/parties/party/${partyId}`)
    },
  }
}

export default webAPI()
