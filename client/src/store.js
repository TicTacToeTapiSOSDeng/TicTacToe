import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase/firebase.js'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    roomname: '',
    roomList : [],
  },
  mutations: {
    setUsername(state, payload){
      state.username = payload
    },
    setRoomName(state, payload) {
      state.roomname = payload
    }
  },
  actions: {
    submitUsername(){
      let username = this.state.username
      localStorage.setItem('nickname', username)
      router.push('/room')
    },
    createNewRoom ({ commit }) {
      console.log(this.state.roomname)
      let roomname = this.state.roomname
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
          swal('Berhasil membuat Room Baru',roomname)
          router.push('/board')
        })
    },
    getRoomList () {
      db.ref('/Rooms/')
      .once('value')
      .then(snapshot=> {
          let result = snapshot.val()
          console.log(result,'ini result')
          for(var key in result) {
              let room = result[key]
              room.roomName = key
              this.state.roomList.push(room)
          }
          // this.state.roomList.push(result)
          console.log(this.state.roomList)
      })
    },
    joinRoomOrang (context,value) {
      console.log('join room orang', value)
      db.ref('/Players/Player2').set({
          nickname : 'nickname 2',
          status: false,
      })
      .then(Response=> {
          db.ref('/Rooms/' + value + '/player2').set({
              nickname: 'nickname 2',
              statusPlayer: false,
              typePlayer: 'clear'
          })
          router.push('/board')
      })
    },
  }
})
