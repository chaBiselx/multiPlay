<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="md-menu"/>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img
          class="logo"
          src="@/assets/img/MultiPlay.png"
          alt=""
        >
        MultiPlay
      </div>
    </v-ons-toolbar>

    <div class="center text">
      <h1>Multiplay</h1>
      <p>Cette application est un projet étudiant réalisé en 2018 par Charles BISELX en License professionnelle Concepteur
      et Intégrateur Système Internet/Intranet pour l'Entreprise.</p>
      <p>Ce projet avait pour but de comprendre et de dévelloper une application mobile.</p>
      <p>MultiPlay est un application permetant de créer des playlists regroupant des playlists secondaires de musique (actuellement compatible au format mp3/Ogg/Wav) </p>
      <p>Je continue à améliorer le projet quotidiennement, car c'est avant tout pour répondre à mes besoins</p>
      <p>code source du projet : <a onclick="cordova.InAppBrowser.open('https://github.com/chaBiselx/multiPlay', '_system');"> ici</a></p>
      <p>Trello du projet : <a onclick="cordova.InAppBrowser.open('https://trello.com/b/txZMbwSX/multiplay', '_system');"> ici</a></p>
      <p>Cette œuvre est mise à disposition sous Apache License</p>

    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'About',
}
</script>
