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
        <v-ons-input placeholder="Input your playlist name" float
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
    showAddPlaylist(){
      this.namePlaylist = ""
      this.addPlaylistVisible = true
    },
    deletePlaylist(){
      store.commit('deleteInMainList',this.memID)
      this.actionSheetVisible = false
      this.memID = ""
    },
    addPlaylist(n){
      if (n != '') {
        let date = new Date()
        let json = {
          id: date.getTime(),
          name: n,
          subPlaylist: [],
        }
        this.addPlaylistVisible = false
        this.namePlaylist = ""
        this.addPlaylistVisible = false
        store.commit('addInMainList',json)
      }
    },
    play( id ){
      console.log("lance le lecteur de musique "+id);
    },
    goToSubPlaylist(){
      this.$router.push({'name': 'PlaylistPage'})
      console.log("go to subPlaylist "+this.memID);
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
  padding-right: 10px;
}
.optionButton{
  padding-left: 15px;
}
</style>
