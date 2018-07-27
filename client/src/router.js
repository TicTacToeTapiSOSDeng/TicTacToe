import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Board from './views/Board.vue'
import Room from './views/Room.vue'
import JoinRoom from './views/JoinRoom.vue'
import createRoom from './views/createRoom.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/join',
      name: 'join',
      component: JoinRoom
    },
    {
      path: '/create-room',
      name: 'createRoom',
      component: createRoom
    }
  ]
})
