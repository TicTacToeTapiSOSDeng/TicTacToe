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
    roomChannel : '',
    player1: '',
    player2: '',
    data1 : '',
    data2 : '',
    data3 : '',
    data4 : '',
    data5 : '',
    data6 : '',
    data7 : '',
    data8 : '',
    data9 : '',
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
    getDataRoom (context, value ) {
      db.ref('/Rooms/'+value)
          .once('value')
          .then(snapshot=> {
              let result = snapshot.val()
              console.log(result.dataBoard,'ini result')
              // for(var key in result) {
              //     let room = result[key]
              //     room.roomName = key

              //     this.roomList.push(room)
              // }
              // this.roomList.push(result)
              // console.log(this.roomList)
              this.state.data1 = result.dataBoard.data1
              this.state.data2 = result.dataBoard.data2
              this.state.data3 = result.dataBoard.data3
              this.state.data4 = result.dataBoard.data4
              this.state.data5 = result.dataBoard.data5
              this.state.data6 = result.dataBoard.data6
              this.state.data7 = result.dataBoard.data7
              this.state.data8 = result.dataBoard.data8
              this.state.data9 = result.dataBoard.data9
          })
    },
    getDataPlayer (context, value ) {
      db.ref('/Rooms/'+value)
          .once('value')
          .then(snapshot=> {
              let result = snapshot.val()
              console.log(result.player1,'ini result playe')
              // for(var key in result) {
              //     let room = result[key]
              //     room.roomName = key

              //     this.roomList.push(room)
              // }
              // this.roomList.push(result)
              // console.log(this.roomList)
              this.state.player1 = result.player1
              this.state.player2 = result.player2
          })
    },
    createNewRoom ({ commit }) {
      console.log(this.state.roomname)
      let roomname = this.state.roomname
      localStorage.setItem('roomName',roomname)
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
        .then(Response => {
          db.ref('/Rooms/' + roomname).child('dataBoard').set({
            data1 :  {
              icon: 'visibility',
              player: 3,
              size: 100,
              statusbtn : false
            } ,
            data2 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data3 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data4 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data5 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data6 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data7 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data8 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            } ,
            data9 :  {
                icon: 'visibility',
                player: 3,
                size: 100,
                statusbtn : false
            }
          })
          .then(snapshot=> {
            console.log('ini data board')
          })
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
              nickname: localStorage.getItem('nickname') ,
              statusPlayer: false,
              typePlayer: 'clear'
          })
          router.push('/board')
      })
    },
  }
})
