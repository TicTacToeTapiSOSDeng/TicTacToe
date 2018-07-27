<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

    <v-flex xs12>
        <Join/>
    </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import Join from '@/components/Join.vue'


export default {
    name:"room",
    components:{
       Join
    },
}
</script>
