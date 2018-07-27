import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase/firebase.js'
import swal from 'sweetalert'

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
    },
    createNewRoom ({ commit }, roomname) {
      db.ref('/Rooms/' + roomname).child('player1').set({
        nickname: localStorage.getItem('nickname'),
        statusPlayer: true,
        typePlayer: 'far fa-circle'
      })
        .then(Response => {
          db.ref('/Players/Player1').set({
            nickname: localStorage.getItem('nickname'),
            status: false
          })
          swal('Berhasil membuat Room Baru')
        })
    }
  }
})
