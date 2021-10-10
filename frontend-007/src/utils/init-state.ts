import localState from './local-state'


const initState = async () => {
  const { refreshToken, accessToken } = localState.load()
  if(!refreshToken && !accessToken) {
    return null
  }

  const { role, username } = localState.load()
  return {
    role,
    username,
  }
}

export default initState
