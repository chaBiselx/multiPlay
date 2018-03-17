<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="goingBack()">
          <v-ons-icon icon="ion-arrow-return-left"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">MultiPlay</div>
    </v-ons-toolbar>

    <v-ons-list-title>Sous-playlist</v-ons-list-title>
    <v-ons-list id='listID'>
      <v-ons-list-item  v-for="item in secondList"  :key="item.id">

        <label >
          <div class="center">

            <ons-checkbox :id="item.id" ng-model="page.id"></ons-checkbox></v-ons-icon>
            {{item.name}}

          </div>
        </label>
        <div class="right optionButton" @click="option(item.id)">
          >
        </div>
      </v-ons-list-item>

    </v-ons-list>



    <v-ons-action-sheet
        :visible.sync="actionSheetVisible"
        cancelable
        :title="namePlaylist"
    >
      <v-ons-action-sheet-button @click="goToListMusic()">Voir la liste des musiques</v-ons-action-sheet-button>
      <v-ons-action-sheet-button modifier="destructive" @click="deletePlaylist()" >Supprimer</v-ons-action-sheet-button>

    </v-ons-action-sheet>

    <v-ons-fab
      position="bottom right"
      :visible=true
      @click="showAddPlaylist()"
    >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
    <v-ons-fab
      position="bottom left"
      :visible=true
      @click="savePlaylist()"
    >
      <v-ons-icon icon="md-save"></v-ons-icon>
    </v-ons-fab>

    <v-ons-action-sheet
        :visible.sync="addPlaylistVisible"
        cancelable
        title="Ajouter sous-playlist"
    >
      <v-ons-action-sheet-button >
        <v-ons-input placeholder="Nom de votre sous-playlist" float
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
  name: 'playlistPage',
  data () {
    return {
      memID : "",
      namePlaylist: "",
      actionSheetVisible: false ,
      addPlaylistVisible: false ,
      secondList: store.state.secondList,

    }
  },
  methods: {
    option(id){
      this.actionSheetVisible = true
      this.memID = id
      this.namePlaylist =  this.secondList[this.secondList.map(function(item) { return item.id; }).indexOf(this.memID)].name
    },
    showAddPlaylist(){
      this.namePlaylist = ""
      this.addPlaylistVisible = true
    },
    deletePlaylist(){
      store.commit('deleteInSecondList',this.memID)
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
        store.commit('addInSecondList',json)
      }
    },
    goToListMusic(){
      store.commit('changeMemSecondListID',this.memID)
      this.$router.push({'name': 'ListMusic'})
    },
    savePlaylist(){
      let array = []

      for (let i in this.secondList ) {
        if (document.getElementById( this.secondList[i].id ).checked) {
          array.push(this.secondList[i].id)
        }
      }
      store.commit('changeMainListPlaylist',array)
      this.$ons.notification.toast({
        animation: "fall",
        message: 'Sauvegardé!',
        timeout: 2000
      }).then(i => this.shutUp = i === 0);
    },
    goingBack(){
      this.$router.push({'name': 'HomePage'})
      store.commit('removeMemMainListID')
    }
  },
  created(){
    if (store.state.memMainListID == "") {
      this.$router.push({'name': 'HomePage'})
      store.commit('removeMemMainListID')
    }
	},
  mounted(){
    if (store.state.memMainListID != "") {
      let select = store.state.mainList[store.state.mainList.map(function(item) { return item.id; }).indexOf(store.state.memMainListID)].subPlaylist
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


</style>
