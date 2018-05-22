<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="md-menu"/>
        </v-ons-toolbar-button>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="savePlaylist()">
          <v-ons-icon icon="md-save"/>
        </v-ons-toolbar-button>
        <v-ons-toolbar-button @click="goingBack()">
          <v-ons-icon icon="ion-arrow-return-left"/>
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

    <v-ons-list-title>Sous-playlist</v-ons-list-title>
    <v-ons-list id="listID">
      <v-ons-list-item
        v-for="item in secondList"
        :key="item.id"
      >

        <div class="center" >
          <ons-checkbox
            :id="item.id"
            class="checkbox"
            ng-model="page.id"
          />
          <span @click="option(item.id)">
            {{ item.name }}
          </span>
        </div>
        <div
          class="right optionButton"
          @click="goToListMusic(item.id)"
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
      <v-ons-action-sheet-button
        @click="changeName()"
      >
        Modifier le nom
      </v-ons-action-sheet-button>
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
      title="Ajouter sous-playlist"
    >
      <v-ons-action-sheet-button >
        <v-ons-input
          v-model="namePlaylist"
          placeholder="Nom de votre sous-playlist"
          float
          maxlength="25"
          required
          @keydown.enter="addPlaylist(namePlaylist)"
        />
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="addPlaylist(namePlaylist)">valider</v-ons-action-sheet-button>
    </v-ons-action-sheet>

  </v-ons-page>
</template>

<script>
import store from '@/store'
export default {
  name: 'PlaylistPage',
  data() {
    return {
      memID: '',
      namePlaylist: '',
      actionSheetVisible: false,
      addPlaylistVisible: false,
      secondList: store.state.secondList,
    }
  },
  created() {
    if (store.state.memMainListID == '') {
      this.$router.push({ name: 'HomePage' })
      store.commit('removeMemMainListID')
    }
  },
  mounted() {
    if (store.state.memMainListID != '') {
      let select =
        store.state.mainList[
          store.state.mainList
            .map(item => {
              return item.id
            })
            .indexOf(store.state.memMainListID)
        ].subPlaylist
      for (let i in select) {
        document.getElementById(select[i]).checked = true
      }
    }
  },
  methods: {
    option(id) {
      this.actionSheetVisible = true
      this.memID = id
      this.namePlaylist = this.secondList[
        this.secondList
          .map(item => {
            return item.id
          })
          .indexOf(this.memID)
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
        store.dispatch('changeSecondListName', json)
      }
      this.actionSheetVisible = false
      this.memID = ''
    },
    showAddPlaylist() {
      this.namePlaylist = ''
      this.addPlaylistVisible = true
    },
    deletePlaylist() {
      store.dispatch('deleteInSecondList', this.memID)
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
        store.dispatch('addInSecondList', json)
      }
    },
    goToListMusic(id) {
      this.memID = id
      store.commit('changeMemSecondListID', this.memID)
      this.$router.push({ name: 'ListMusic' })
    },
    savePlaylist() {
      let array = []
      for (let i in this.secondList) {
        if (document.getElementById(this.secondList[i].id).checked) {
          array.push(this.secondList[i].id)
        }
      }
      store.dispatch('changeMainListPlaylist', array)
      this.$ons.notification
        .toast({
          animation: 'fall',
          message: 'Sauvegardé!',
          timeout: 2000,
        })
        .then(i => (this.shutUp = i === 0))
    },
    goingBack() {
      this.$router.push({ name: 'HomePage' })
      store.commit('removeMemMainListID')
    },
  },
}
</script>
