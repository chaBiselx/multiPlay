<template>
  <v-ons-page id="app">
    <v-ons-splitter :class="{ 'nightMod-background': nightMod}">
      <v-ons-splitter-side
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen"
        swipeable
        collapse
        width="250px"
      >
        <menu-page/>
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
  name: 'App',
  components: {
    HomePage,
    MenuPage,
  },
  data() {
    return {
      nightMod: true,
    }
  },
  computed: {
    menuIsOpen: {
      get() {
        return this.$store.state.splitter.open
      },
      set(newValue) {
        this.$store.commit('splitter/toggle', newValue)
      },
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nightMod-background div {
  background-color: rgb(24, 44, 68) !important;
  border-color: transparent !important;
  color: grey !important;
}
.nightMod-background ons-list {
  background-color: rgb(24, 44, 68) !important;
  background-image: none !important;
}
.nightMod-background ons-icon {
  color: grey !important;
}
.nightMod-background ons-button {
  background-color: rgb(14, 34, 58) !important;
  color: darkGrey !important;
}
.nightMod-background .input__text {
  background-color: rgb(14, 34, 58) !important;
  color: darkGrey !important;
  border-color: black !important;
}
.nightMod-background .btn-list {
  border-color: #cc3399 !important;
}
.nightMod-background ons-fab,
.nightMod-background ons-fab * {
  background-color: rgb(4, 14, 28) !important;
  border: none !important;
}
ons-splitter-side[side='left'][animation='overlay'] {
  border-right: 1px solid #bbb;
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
ons-list-item,
ons-card {
  cursor: grabbing;
}
ons-list-item {
  border: none;
}
.pointer {
  cursor: pointer;
}
.header {
  text-align: center;
}
.logo {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
.optionButton {
  cursor: pointer;
  padding: 7px 15px 7px 22px;
}
.checkbox {
  padding-right: 15px;
}
.text {
  margin: 15px;
}
.text h1 {
  text-align: center;
}
</style>
