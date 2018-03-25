<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <router-view/>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import HomePage from './components/HomePage'
import MenuPage from './components/MenuPage'



export default {
  name: 'app',
  computed: {
    menuIsOpen: {
      get () {
        return this.$store.state.splitter.open
      },
      set (newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  components: {
    HomePage,
    MenuPage,
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}

img {
  max-width: 300px;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}

.header {
  text-align: center;
}

.logo{
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

.optionButton{
  padding: 7px 15px 7px 15px;
}

.text{
  margin: 15px;
}
.text h1{
  text-align: center;
}
</style>
