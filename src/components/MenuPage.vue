<template>
  <v-ons-page>
    <div class="header">
      <img class="Mainlogo" src="@/assets/img/MultiPlay.png"   alt="Menu">
    </div>

    <v-ons-list-title>Menu</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item class="pointer"modifier="chevron" v-for="item in essentialLinks" @click="goTo(item.link)" :key="item.link">
        <div class="left"><v-ons-icon fixed-width :icon="item.icon"></v-ons-icon></div>
        <div class="center">{{ item.label }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import store from '@/store'
export default {
  name: 'menuPage',
  data () {
    return {
      essentialLinks: [
        {
          label: 'Playlist',
          link: 'Home',
          icon: 'md-home'
        },
        {
          label: 'Lecteur',
          link: 'MusicPlayer',
          icon: 'ion-play'
        },
        {
          label: 'Options',
          link: 'Option',
          icon: 'ion-settings'
        },
        {
          label: 'À propos',
          link: 'About',
          icon: 'fa-book'
        },
      ]
    }
  },
  methods: {
    goTo (url) {
      switch (url) {
        case 'MusicPlayer':
          this.$router.push({'name': 'MusicPlayerPage'})
          store.commit('splitter/toggle')
          store.commit('removeMemMainListID')
          store.commit('removeMemSecondListID')
          break;
        case 'About':
          this.$router.push({'name': 'About'})
          store.commit('splitter/toggle')
          store.commit('removeMemMainListID')
          store.commit('removeMemSecondListID')
          break;
        case 'Home':
          this.$router.push({'name': 'HomePage'})
          store.commit('splitter/toggle')
          store.commit('removeMemMainListID')
          store.commit('removeMemSecondListID')
          break;
        case 'Option':
          this.$router.push({'name': 'Option'})
          store.commit('splitter/toggle')
          break;
        default:
          //redirect home
          this.$router.push({'name': 'HomePage'})
          store.commit('splitter/toggle')
          store.commit('removeMemMainListID')
          store.commit('removeMemSecondListID')
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Mainlogo {
  width: 100px;
  height: 100px;
}
</style>
