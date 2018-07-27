<template>
  <div class="room">
          <BtnCreate/>
          <BtnJoin/>
  </div>

</template>


<script>
import BtnCreate from '@/components/BtnCreate.vue'
import BtnJoin from '@/components/BtnJoin.vue'

export default {
    name:"room",
    components:{
        BtnCreate,
        BtnJoin
    },
    data(){
      return{
        
      }
    }
}
</script>

<style>
  .room{
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url('../../src/assets/tictactoe.jpg');
    background-position: center;
  }

</style>

