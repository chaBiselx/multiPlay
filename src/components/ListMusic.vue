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
      <div class="right">
        <v-ons-toolbar-button @click="goingBack()">
          <v-ons-icon icon="ion-arrow-return-left"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list-title>Liste des musiques</v-ons-list-title>
    <v-ons-list>

      <v-ons-list-item  v-for="item in listMusic"  :key="item.link">
        <label class="label_music">

          <ons-checkbox :id="item.link" :name="item.name"></ons-checkbox>
          {{item.name}}

        </label>
      </v-ons-list-item>

    </v-ons-list>


    <v-ons-fab
      position="bottom left"
      :visible=true
      @click="savePlaylist()"
    >
      <v-ons-icon icon="md-save"></v-ons-icon>
    </v-ons-fab>

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
    savePlaylist(){
      let array = []
      for (let i in this.listMusic ) {
        if (document.getElementById( this.listMusic[i].link ).checked) {
          array.push(this.listMusic[i].link)
        }
      }
      store.dispatch('changeSecondListPlaylist',array)
      this.$ons.notification.toast({
        animation: "fall",
        message: 'Sauvegardé!',
        timeout: 2000
      }).then(i => this.shutUp = i === 0);
    },
    goingBack(){
      this.$router.push({'name': 'PlaylistPage'})
      store.commit('removeMemSecondListID')
    }
  },
  created(){
    if (store.state.memSecondListID == "") {
      this.$router.push({'name': 'HomePage'})
      store.commit('removeMemMainListID')
      store.commit('removeMemSecondListID')

    }else{
      let test = [ ]
      for(let i of test){
        let array = i.split("/")
        let name =  array[array.length-1]

        let json = {
          "link": i ,
          "name": name,
        }
        this.listMusic.push(json)
      }
    }


	},
  mounted(){
    if (store.state.memSecondListID != "") {
      let select = store.state.secondList[store.state.secondList.map(function(item) { return item.id; }).indexOf(store.state.memSecondListID)].subPlaylist

      for (let i in select) {
        document.getElementById( select[i] ).checked = true
      }

    }
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
.logo{
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
</style>
