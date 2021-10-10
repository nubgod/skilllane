const keyState = 'auth'

const localState = {
  load: () => {
    try {
      const state = localStorage.getItem(keyState)
      return JSON.parse(state + '') || {}
    } catch (error) {
      return {}
    }
  },
  save: (json : any) => {
    const state = JSON.stringify(json)
    localStorage.setItem(keyState, state)
  },
  clean: () => localStorage.removeItem(keyState),
}

export default localState