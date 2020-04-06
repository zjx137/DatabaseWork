import { login, logout, getInfo } from '@/api/user'

import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    role:'',
    avatar: 'ok'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    //console.log(username)
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.data.account)
        commit('SET_NAME',data.data.account)
        commit('SET_ROLE',data.data.role)
        localStorage.setItem('role',data.data.role)
        localStorage.setItem('userId',data.data.account)

        //setToken(data.data.account)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit},userId) {
    return new Promise((resolve, reject) => {
      getInfo(userId).then(res=>{
        
      })
    }).catch(err=>{
      reject(err)
    })
      
    
  },

  // user logout
  logout({ commit, state }) {
    
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
        commit('SET_NAME','')
        resetRouter()
        commit('RESET_STATE')
        
    
  },

  // remove token

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

