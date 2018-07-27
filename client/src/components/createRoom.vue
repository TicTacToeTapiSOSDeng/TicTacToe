<template>
    <main>
        <v-container >
            <v-layout justify-center>
                <v-flex xs5>
                    <v-card color="blue" id="cardRoom" width="400px" align-center>
                        <v-container fluid>
                          <v-form>
                            <v-layout row wrap>
                              <v-text-field id="text"
                                label="Room Name"
                                v-model="roomname"
                              ></v-text-field>
                            </v-layout>
                          </v-form>
                        </v-container>
                        <v-card-actions>
                        <v-btn @click="createNewRoom" id="createRoom" color="white">Submit</v-btn>
                      </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        roomname: {
            get () {
                return this.$store.state.roomname
            },
            set (value) {
                this.$store.commit('setRoomName', value)
            }
        }
    },
    methods: {
        ...mapActions([
            'createNewRoom'
        ])
    }
}
</script>

<style scoped>
main{
  height: 100vh;
  background-image: linear-gradient(#43C6AC,#191654)
}

#createRoom{
  width: 100%;
}

#cardRoom{
    margin-top: 30vh;
}

.v-input{
    color: white
}

</style>
