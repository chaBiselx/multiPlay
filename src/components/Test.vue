<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left pointer">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img class="logo" src="@/assets/img/MultiPlay.png" alt="">
        MultiPlay
      </div>
    </v-ons-toolbar>

    <div class="center text">
      <h1>Multiplay</h1>
      <p>Ceci est une page de test pour le développement (WIP)</p>
      <p>data1 : {{data1}}</p>
      <p>data2 : {{data2}}</p>


    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      data1 : [],
      data2 : [],
    }
  },
  methods: {
  },
  async created(){


    let temp = []

    MediaRetrieve.getAudioList(
      function(data){
        temp.push(data)
      }
    )
    this.data2 = temp



    this.data1 = temp.length
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
