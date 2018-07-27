<template>
<div style="margin-top:15%" >
    <v-container style="background-color:lightcoral" fluid>
        <v-layout align-end justify-center row fill-height>
            <v-card flat >
            <v-flex xs2>
                    <v-btn :disabled='data1.statusbtn' @click="button1" class="block"> <v-icon :size="data1.size" class="iconn" > {{data1.icon}} </v-icon> </v-btn>
                    <v-btn :disabled='data4.statusbtn' @click="button4" class="block"> <v-icon :size="data4.size" class="iconn" > {{data4.icon}} </v-icon>  </v-btn>
                    <v-btn :disabled='data7.statusbtn' @click="button7" class="block"> <v-icon :size="data7.size" class="iconn"> {{data7.icon}} </v-icon> </v-btn>
            </v-flex>
            </v-card>
            <v-card flat>
            <v-flex xs2 >
                    <v-btn :disabled='data2.statusbtn' @click="button2" class="block"> <v-icon :size="data2.size" class="iconn" > {{data2.icon}} </v-icon> </v-btn>
                    <v-btn :disabled='data5.statusbtn' @click="button5" class="block"> <v-icon :size="data5.size" class="iconn">{{data5.icon}}</v-icon> </v-btn>
                    <v-btn :disabled='data8.statusbtn' @click="button8" class="block"> <v-icon :size="data8.size" class="iconn"> {{data8.icon}} </v-icon> </v-btn>
            </v-flex>
            </v-card>
            <v-card flat>
            <v-flex xs2>
                    <v-btn :disabled='data3.statusbtn' @click="button3" class="block"> <v-icon :size="data3.size" class="iconn"> {{data3.icon}} </v-icon> </v-btn>
                    <v-btn :disabled='data6.statusbtn' @click="button6" class="block"> <v-icon :size="data6.size" class="iconn"> {{data6.icon}} </v-icon> </v-btn>
                    <v-btn :disabled='data9.statusbtn' @click="button9" class="block"> <v-icon :size="data9.size" class="iconn"> {{data9.icon}} </v-icon> </v-btn>
            </v-flex>
            </v-card>
        </v-layout>
    </v-container>
    <v-container>
    <input type="text">
    <v-btn @click="addUser" >Add user</v-btn>
    <v-btn @click="joinRoom" > Join Room </v-btn>
    <v-btn @click="chooseRoom"> Choose Room </v-btn>
    <input type="text" v-model="nameRoom">
    <v-btn @click="createRoom" > createRoom</v-btn>
    <div>
        <v-card v-for="(room, index) in roomList" :key="index" >
            <v-card-text>
                <v-btn v-if="room.player2" disabled @click="joinRoomOrang (room) " > {{room.roomName}} </v-btn>
                <v-btn v-else @click="joinRoomOrang (room) " > {{room.roomName}} </v-btn>
            </v-card-text>
        </v-card>
    </div>
    </v-container>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {db} from '@/firebase/firebase.js'
import swal from 'sweetalert'
export default {
    created () {
            this.getRoomList()
    },
    data () {
        return {
            roomList : [],
            nickname :'',
            nameRoom : '',
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
            } ,
            userTurn: localStorage.getItem('user')
        }
    },
    methods: {
        ...mapActions([
            'createNewRoom'
        ]),
        addUser() {
            localStorage.setItem('nickname', this.nickname)
            this.$router.push('/')
        },
        chooseRoom () {
            console.log('choose room')
        },
        joinRoom () {
            console.log('join room')
        },
        createRoom () {
            console.log('reate room')
            console.log(this.nameRoom)
            localStorage.setItem('roomName', this.nameRoom)
            localStorage.setItem('player','player1')
            this.createNewRoom(this.nameRoom)
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

                    this.roomList.push(room)
                }
                // this.roomList.push(result)
                console.log(this.roomList)
            })
        },
        joinRoomOrang (room) {
            console.log('join room orang', room.roomName)
            db.ref('/Players/Player2').set({
                nickname : localStorage.getItem('nickname'),
                statusPlayer: false,
                typePlayer: 'clear'
            })
            .then(Response=> {
                db.ref('/Rooms/' + room.roomName + '/player2').set({
                    nickname: 'nickname 2',
                    status: false
                })
            })
        },
        button1 () {
            console.log('button 1')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data1.icon = 'clear'
                this.data1.size = 100
                this.data1.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data1.icon)

                } else if (this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data1.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data1.icon)
                } else {
                    console.log('belum menang')
                }
                
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data1.icon = 'far fa-circle'
                this.data1.size = 80
                this.data1.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data1.icon)
                } else if (this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data1.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data1.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button2 () {
            console.log('button 2')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data2.icon = 'clear'
                this.data2.size = 100
                this.data2.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data2.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data2.icon)
                } else {
                    console.log('belum menang')
                    
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data2.icon = 'far fa-circle'
                this.data2.size = 80
                this.data2.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data2.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data2.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button3 () {
            console.log('button 3')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data3.icon = 'clear'
                this.data3.size = 100
                this.data3.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data3.icon)
                } else if (this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data3.icon)
                } else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data3.icon)
                } else {
                    console.log('belum menang')
                }

            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data3.icon = 'far fa-circle'
                this.data3.size = 80
                this.data3.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data1.icon, this.data2.icon, this.data3.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data3.icon)
                } else if (this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data3.icon)
                } else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data3.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button4 () {
            console.log('button 4')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data4.icon = 'clear'
                this.data4.size = 100
                this.data4.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data4.icon)
                } else if (this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data4.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data4.icon = 'far fa-circle'
                this.data4.size = 80
                this.data4.statusbtn = true
                console.log('ini else')

                 if(this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data4.icon)
                } else if (this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data4.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button5 () {
            console.log('button 5')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data5.icon = 'clear'
                this.data5.size = 100
                this.data5.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data5.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data5.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data5.icon)
                }  else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data5.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data5.icon = 'far fa-circle'
                this.data5.size = 80
                this.data5.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data5.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data5.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data5.icon)
                }  else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data5.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button6 () {
            console.log('button 6')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data6.icon = 'clear'
                this.data6.size = 100
                this.data6.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data6.icon)
                } else if (this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data6.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data6.icon = 'far fa-circle'
                this.data6.size = 80
                this.data6.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data6.icon)
                } else if (this.isWon(this.data4.icon, this.data5.icon, this.data6.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data6.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button7 () {
            console.log('button 7')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data7.icon = 'clear'
                this.data7.size = 100
                this.data7.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data7.icon)
                } else if (this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data7.icon)
                } else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data7.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data7.icon = 'far fa-circle'
                this.data7.size = 80
                this.data7.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data1.icon, this.data4.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data7.icon)
                } else if (this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data7.icon)
                } else if (this.isWon(this.data3.icon, this.data5.icon, this.data7.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data7.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button8 () {
            console.log('button 8')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data8.icon = 'clear'
                this.data8.size = 100
                this.data8.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data8.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data8.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data8.icon = 'far fa-circle'
                this.data8.size = 80
                this.data8.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data8.icon)
                } else if (this.isWon(this.data2.icon, this.data5.icon, this.data8.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data8.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        button9 () {
            console.log('button 9')
            let user = this.userTurn
            if (!user) {
                localStorage.setItem('user', true)
                this.userTurn = true
                this.data9.icon = 'clear'
                this.data9.size = 100
                this.data9.statusbtn = true
                console.log('ini if')

                if(this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data9.icon)
                } else if (this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data9.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('X menang')
                    this.showAlert(this.data9.icon)
                } else {
                    console.log('belum menang')
                }
            }
            else if (user) {
                localStorage.setItem('user', false)
                this.userTurn = false
                this.data9.icon = 'far fa-circle'
                this.data9.size = 80
                this.data9.statusbtn = true
                console.log('ini else')

                if(this.isWon(this.data3.icon, this.data6.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data9.icon)
                } else if (this.isWon(this.data7.icon, this.data8.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data9.icon)
                } else if (this.isWon(this.data1.icon, this.data5.icon, this.data9.icon)) {
                    console.log('O menang')
                    this.showAlert(this.data9.icon)
                } else {
                    console.log('belum menang')
                }
            }
        },
        isWon(icon1, icon2, icon3) {
            if (icon1 === icon2 && icon1 === icon3) {
                return true
            } else {
                return false
            }
        },
        showAlert(icon) {
            swal({
                title: `${localStorage.getItem('nickname')} Wins!`,
                text: '',
                icon: 'success'
            })
        }
    }
}
</script>

<style scoped >
.block {
    display: block;
    width: 100%;
    border: none;
    background-color: #4CAF50;
    color: white;
    padding: 50px 50px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
}

.block:hover {
    background-color: #4CAF50;
    color: white;
}
.iconn {
    padding-bottom: 30px
}
input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>

