<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img class="logo" src="/src/assets/img/MultiPlay.png" alt="">
        MultiPlay
      </div>
    </v-ons-toolbar>

    <v-ons-list-title>Playlist</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item  v-for="item in MainList"  :key="item.id">


        <div class="center">
          <v-ons-icon class="buttonPlay" icon="ion-play" @click="play(item.id)"></v-ons-icon>
          {{item.name}}
        </div>
        <div class="right optionButton" @click="option(item.id)">
          >
        </div>
      </v-ons-list-item>

    </v-ons-list>



    <v-ons-action-sheet
        :visible.sync="actionSheetVisible"
        cancelable
        :title='namePlaylist'
    >
      <v-ons-action-sheet-button @click="changeName()">Modifier le nom</v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="goToSubPlaylist()">Modifier sous-playlist</v-ons-action-sheet-button>
      <v-ons-action-sheet-button modifier="destructive" @click="deletePlaylist()" >Supprimer</v-ons-action-sheet-button>

    </v-ons-action-sheet>

    <v-ons-fab
      position="bottom right"
      :visible=true
      @click="showAddPlaylist()"
    >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <v-ons-action-sheet
        :visible.sync="addPlaylistVisible"
        cancelable
        title="Ajouter playlist"
    >
      <v-ons-action-sheet-button >
        <v-ons-input placeholder="Nom de votre playlist" float
          v-model="namePlaylist" required maxlength="25"
        >
        </v-ons-input>
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="addPlaylist(namePlaylist)">valider</v-ons-action-sheet-button>
    </v-ons-action-sheet>

  </v-ons-page>
</template>

<script>
  import store from '@/store'

export default {
  name: 'homePage',
  data () {
    return {
      memID : "",
      namePlaylist: "",
      actionSheetVisible: false ,
      addPlaylistVisible: false ,
      MainList: store.state.mainList,
    }
  },
  methods: {
    option(id){
      this.actionSheetVisible = true
      this.memID = id
      this.namePlaylist =  this.MainList[this.MainList.map(function(item) { return item.id; }).indexOf(this.memID)].name

    },
    async changeName(){
      let newName = ""
      do {
        newName = await this.$ons.notification.prompt('Entrez le nouveau nom!',{"title":"Noveau nom"})
      } while (newName == "");
      let json = {
        'id': this.memID,
        'newName': newName
      }
      store.dispatch('changeMainListName',json)
      this.actionSheetVisible = false
      this.memID = ""
    },
    showAddPlaylist(){
      this.namePlaylist = ""
      this.addPlaylistVisible = true
    },
    deletePlaylist(){
      store.dispatch('deleteInMainList',this.memID)
      this.actionSheetVisible = false
      this.memID = ""
    },
    addPlaylist(n){
      if (n != '') {
        let date = new Date()
        let json = {
          id: ""+date.getTime(),
          name: n,
          subPlaylist: [],
        }
        this.addPlaylistVisible = false
        this.namePlaylist = ""
        this.addPlaylistVisible = false
        store.dispatch('addInMainList',json)
      }
    },
    play( id ){
      let playlist = []
      let mainList = this.MainList[this.MainList.map(function(item) { return item.id; }).indexOf(id)].subPlaylist
      for (let m of mainList) {
        let secondList = store.state.secondList[store.state.secondList.map(function(item) { return item.id; }).indexOf(m)].subPlaylist
        for (let p of secondList) {
          playlist.push(p)
        }
      }
      //remove duplicate
      var a = [];
      for (let i = 0; i < playlist.length; i++ ) {
          var current = playlist[i];
          if (a.indexOf(current) < 0) a.push(current);
      }

      playlist.length = 0;
      for (let i = 0; i < a.length; i++ ) {
          playlist.push( a[i] );
      }
      store.dispatch('changePlaylist',playlist)
      this.$router.push({'name': 'MusicPlayerPage'})

    },
    goToSubPlaylist(){
      store.commit('changeMemMainListID',this.memID)
      this.$router.push({'name': 'PlaylistPage'})
    },
  },
  created(){
	}
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
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

.center{
  overflow: scroll;
}
.buttonPlay{
  padding: 7px 15px 7px 0;
}
.optionButton{
  padding: 7px 15px 7px 15px;
}
.logo{
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
</style>
