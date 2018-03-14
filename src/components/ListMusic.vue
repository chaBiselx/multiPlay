<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">MultiPlay</div>
    </v-ons-toolbar>

    <v-ons-list-title>Liste des musiques</v-ons-list-title>
    <v-ons-list>

      <v-ons-list-item  v-for="item in listMusic"  :key="item.link">
        <label class="label_music">

          <ons-checkbox id="item.link" name="item.name"></ons-checkbox>
          {{item.name}}
          <div class="left">
            <small>{{item.artist}}</small>
          </div>

        </label>
      </v-ons-list-item>

    </v-ons-list>




  </v-ons-page>
</template>

<script>
  import store from '@/store'

export default {
  name: 'listMusic',
  data () {
    return {
      listMusic: [],
    }
  },
  methods: {

  },
  created(){
    this.listMusic = [
      {name: "name1",
      artist:"artist",
      link: "link1"},
      {name: "name2",
      artist:"artist",
      link: "link2"},
      {name: "name3",
      artist:"artist",
      link: "link3"},
      {name: "name4",
      artist:"artist",
      link: "link4"},
    ]
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.label_music{
  display: block;
  width: 100%;
}
.label_music .left{
  text-align: right;
}
</style>
