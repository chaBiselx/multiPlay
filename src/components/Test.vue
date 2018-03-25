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

      <p>data : {{data}}</p>


    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      data : "",
    }
  },
  methods: {


  },
  created(){
    this.data = getExternalStorageDirectory()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
