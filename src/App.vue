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
        <router-view @interface="nightMod = $event"/>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import HomePage from './components/HomePage'
import MenuPage from './components/MenuPage'
import store from '@/store'

export default {
  name: 'App',
  components: {
    HomePage,
    MenuPage,
  },
  props: {
    nightMod: {
      type: Boolean,
      default() {
        return false
      },
    },
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
  mounted() {
    this.nightMod = store.state.nightMod
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nightMod-background div {
  background-color: rgb(20, 40, 60) !important;
  border-color: transparent !important;
  color: grey !important;
  border-color: none !important;
}
.nightMod-background ons-list {
  background-color: rgb(20, 40, 60) !important;
  background-image: none !important;
}
.nightMod-background ons-icon {
  color: grey !important;
}
.nightMod-background ons-button {
  background-color: rgb(10, 30, 50) !important;
  color: darkGrey !important;
}
.nightMod-background .input__text {
  background-color: rgb(10, 30, 50) !important;
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
.nightMod-background .logo,
.nightMod-background .Mainlogo {
  filter: brightness(60%);
}
.nightMod-background .span__switch .switch__touch {
  background-color: transparent !important;
}
.nightMod-background .span__switch .switch__toggle {
  background-color: rgb(14, 24, 38) !important;
  box-shadow: inset 0 0 0 2px rgb(14, 24, 38) !important;
}
.nightMod-background .span__switch :checked + .switch__toggle {
  background-color: rgb(4, 14, 14) !important;
  box-shadow: inset 0 0 0 2px rgb(4, 14, 14) !important;
}
.nightMod-background .span__switch .switch__handle {
  background-color: rgb(30, 50, 70) !important;
}
:checked + .switch__toggle {
  background-color: #0076ff !important;
  box-shadow: inset 0 0 0 2px #0076ff !important;
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
ons-list-item {
  border: none;
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
  padding: 7px 15px 7px 22px;
}
.checkbox {
  padding-right: 15px;
}
.text {
  padding: 15px;
  margin: 0;
}
.text h1 {
  text-align: center;
}
.important {
  color: #c80a0c !important;
}
.action-sheet-title {
  color: #9e9e9e !important;
  font-weight: bold !important;
}
a {
  text-decoration: underline;
}
</style>
