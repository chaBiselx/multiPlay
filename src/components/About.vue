<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
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
      <p>Cette application est un projet étudiant réalisé en 2018 par Charles BISELX en License professionnelle Concepteur
      et Intégrateur Système Internet/Intranet pour l'Entreprise.</p>
      <p>Ce projet avait pour but de comprendre et de dévelloper une application mobile.</p>
      <p>MultiPlay est un application permetant de créer des playlists regroupant des playlists de musique secondaire</p>
      <p>code source du projet : <a href="https://github.com/chaBiselx/multiPlay"> ici</a></p>


    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {

    }
  },
  methods: {


  },
  created(){

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
