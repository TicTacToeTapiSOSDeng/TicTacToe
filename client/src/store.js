import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    setUsername(state, payload){
      state.username = payload
    }
  },
  actions: {
    submitUsername(){
      let username = this.state.username
      localStorage.setItem('username', username)
    }
  }
})
