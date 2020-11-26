import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  avatar: '',
  id: '',
  userName: ''
}

const mutations = {
  SET_USER_NAME (state, name) {
    state.userName = name
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}
const actions = {
  // 设置name
  setUserName ({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
