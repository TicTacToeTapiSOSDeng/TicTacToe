<template>
  <div class="about">
    <v-container>
      <v-layout justify-center>
        <v-flex xs7>
              <v-card>
                    <v-card-media
                        src="https://i0.wp.com/www.remodelaholic.com/wp-content/uploads/2017/07/ginger-tic-tac-toe-board-at-GingerSnapCrafts.com_.jpg?resize=533%2C800&ssl=1"
                        height="500px"
                      ></v-card-media>

                        <nickname></nickname>
                      
                      <v-card-actions>
                        <v-btn id="nickname" color="green">Submit</v-btn>
                      </v-card-actions>
                  </v-card>
            </v-flex>
      </v-layout>
    </v-container>  
  </div>
</template>

<script>
import nickname from '@/components/nicknamebox.vue'
export default {
  components: {
    nickname
  }
}
</script>

<style scoped>
#nickname{
  width: 100%;
}
</style>

