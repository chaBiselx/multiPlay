<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <h1>{{title}}</h1>
    </div>

    <v-ons-list-title>Main</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="chevron" v-for="item in essentialLinks" @click="goTo(item.link)" :key="item.link">
        <div class="left"><v-ons-icon fixed-width :icon="item.icon"></v-ons-icon></div>
        <div class="center">{{ item.label }}</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import About from '@/components/PlaylistPage'

export default {
  name: 'menu',
  data () {
    return {
      title:"Menu",
      essentialLinks: [
        {
          label: 'Playlist',
          link: 'Home',
          icon: 'md-home'
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
      console.log(url);

      switch (url) {
        case 'About':
          //router.push(About)
          //this.$router.push(About)
          //$router.push(About)
          //router.go(About)

          window.location.href = About ;
          break;
        default:
          //redirect home
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
  height: 60px;
}

img {
  max-width: 150px;
}

ons-list-title {
  text-transform: none;
}

ons-list-item {
  cursor: pointer;
}
</style>
