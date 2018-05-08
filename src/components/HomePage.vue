<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left pointer">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="md-menu"/>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img
          class="logo"
          src="@/assets/img/MultiPlay.png"
          alt=""
        >
        MultiPlay
      </div>
    </v-ons-toolbar>

    <v-ons-list-title>Playlist</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item
        v-for="item in MainList"
        :key="item.id"
      >


        <div class="center">
          <v-ons-icon
            class="buttonPlay"
            icon="ion-play"
            @click="play(item.id)"
          />
          <span @click="option(item.id)">
            {{ item.name }}
          </span>
        </div>
        <div
          class="right optionButton"
          @click="goToSubPlaylist(item.id)"
        >
          <v-ons-icon icon="ion-ios-arrow-forward"/>
        </div>
      </v-ons-list-item>

    </v-ons-list>



    <v-ons-action-sheet
      :visible.sync="actionSheetVisible"
      :title="namePlaylist"
      cancelable
    >
      <v-ons-action-sheet-button @click="changeName()">Modifier le nom</v-ons-action-sheet-button>
      <v-ons-action-sheet-button
        modifier="destructive"
        @click="deletePlaylist()"
      >
        Supprimer
      </v-ons-action-sheet-button>

    </v-ons-action-sheet>

    <v-ons-fab
      position="bottom right"
      visible="true"
      @click="showAddPlaylist()"
    >
      <v-ons-icon icon="ion-plus"/>
    </v-ons-fab>

    <v-ons-action-sheet
      :visible.sync="addPlaylistVisible"
      cancelable
      title="Ajouter playlist"
    >
      <v-ons-action-sheet-button >
        <v-ons-input
          v-model="namePlaylist"
          placeholder="Nom de votre playlist"
          float
          maxlength="25"
          required
        />
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="addPlaylist(namePlaylist)">valider</v-ons-action-sheet-button>
    </v-ons-action-sheet>

  </v-ons-page>
</template>

<script>
import store from '@/store'
export default {
  name: 'HomePage',
  data() {
    return {
      memID: '',
      namePlaylist: '',
      actionSheetVisible: false,
      addPlaylistVisible: false,
      MainList: [],
    }
  },
  async beforeCreate() {
    if (!store.state.load) {
      store.commit('changeLoad', true)
      await this.$store.dispatch('loadData')
    }
    this.MainList = store.state.mainList
  },
  mounted() {
    this.MainList = store.state.mainList
  },
  methods: {
    option(id) {
      this.actionSheetVisible = true
      this.memID = id
      this.namePlaylist = this.MainList[
        this.MainList.map(item => {
          return item.id
        }).indexOf(this.memID)
      ].name
    },
    async changeName() {
      let newName = ''
      newName = await this.$ons.notification.prompt('Entrez le nouveau nom!', {
        title: 'Nouveau nom',
      })
      if (newName != '' && newName != null) {
        let json = {
          id: this.memID,
          newName: newName,
        }
        store.dispatch('changeMainListName', json)
      }
      this.actionSheetVisible = false
      this.memID = ''
    },
    showAddPlaylist() {
      this.namePlaylist = ''
      this.addPlaylistVisible = true
    },
    deletePlaylist() {
      store.dispatch('deleteInMainList', this.memID)
      this.actionSheetVisible = false
      this.memID = ''
    },
    addPlaylist(n) {
      if (n != '') {
        let date = new Date()
        let json = {
          id: '' + date.getTime(),
          name: n,
          subPlaylist: [],
        }
        this.addPlaylistVisible = false
        this.namePlaylist = ''
        this.addPlaylistVisible = false
        store.dispatch('addInMainList', json)
      }
    },
    play(id) {
      let playlist = []
      let mainList = this.MainList[
        this.MainList.map(item => {
          return item.id
        }).indexOf(id)
      ].subPlaylist
      for (let m of mainList) {
        let secondList =
          store.state.secondList[
            store.state.secondList
              .map(item => {
                return item.id
              })
              .indexOf(m)
          ].subPlaylist
        for (let p of secondList) {
          playlist.push(p)
        }
      }
      //remove duplicate
      var a = []
      for (let i = 0; i < playlist.length; i++) {
        var current = playlist[i]
        if (a.indexOf(current) < 0) a.push(current)
      }
      playlist.length = 0
      for (let i = 0; i < a.length; i++) {
        playlist.push(a[i])
      }
      store.dispatch('changePlaylist', playlist)
      this.$router.push({ name: 'MusicPlayerPage' })
    },
    goToSubPlaylist(id) {
      this.memID = id
      store.commit('changeMemMainListID', this.memID)
      this.$router.push({ name: 'PlaylistPage' })
    },
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  overflow: scroll;
}
.buttonPlay {
  padding: 7px 17px 7px 0;
}
</style>
