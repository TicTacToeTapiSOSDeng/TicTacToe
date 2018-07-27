<template>
<main>
  <div class="login">
    <v-container>
      <v-layout justify-center>
        <v-flex xs7>
              <v-card color="white">
                    <v-card-media
                        src="https://i0.wp.com/www.remodelaholic.com/wp-content/uploads/2017/07/ginger-tic-tac-toe-board-at-GingerSnapCrafts.com_.jpg?resize=533%2C800&ssl=1"
                        height="450px"
                      ></v-card-media>
                      <div id="nickname">
                        <v-container fluid>
                          <v-form>
                            <v-layout row wrap>
                              <v-text-field v-model="username"
                                label="Player name"
                                placeholder="Write your username here"
                              ></v-text-field>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </div>
                      <v-card-actions>
                        <v-btn id="nickname" color="green" v-on:click="submitUsername">Submit</v-btn>
                      </v-card-actions>
                  </v-card>
            </v-flex>
      </v-layout>
    </v-container>  
  </div>
</main> 
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'submitUsername'
        ])
    },
    computed: {
        username: {
            get () {
                return this.$store.state.username
            },
            set (value) {
                this.$store.commit('setUsername', value)
            }
        }
    }
}
</script>

<style scoped>
main{
  height: 100vh;
  background-image: linear-gradient(#43C6AC,#191654)
}

#nickname{
  width: 100%;
}
</style>

