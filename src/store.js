import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false,

      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        },
      }
    },

  },
  state:{
    stackLimit: "25",
    noRepeat: "10",
    mainList: [
      {
        id: "123789456",
        name: "tout",
        subPlaylist: ['123789456'],
      },
      {
        id: "987654321",
        name: "name2",
        subPlaylist: ['123741852'],
      },
      {
        id: "123456789",
        name: "name3",
        subPlaylist: ["123741852","951741852"],
      }
    ],
    memMainListID: "",
    secondList: [
      {
        id: "123789456",
        name: "subname1",
        subPlaylist: [
          "/static/temp/2CELLOS - Wake Me Up - Avicii [OFFICIAL VIDEO].mp3",
          "/static/temp/2080.mp3",
          "/static/temp/Borderlands 2 Theme song _No place for a hero_ LYRICS.mp3",
          "/static/temp/Dschinghis Khan - Moskau.mp3",
          "/static/temp/Hey Pachuco-The Mask Soundtrack.mp3",
          "/static/temp/End Credits.mp3",
          "/static/temp/♪ Diggy Diggy Hole.mp3",
          "/static/temp/BenZaie danse la marmelade de ma grand-mère.mp3",
          "/static/temp/Caravan Palace - Lone Digger.mp3",
          "/static/temp/Caravan Palace - Rock It For Me.mp3",
          "/static/temp/Edith Piaf - L'homme a la moto - Lyric.mp3",
          "/static/temp/Indochine L'Aventurier.mp3",
          "/static/temp/NAHEULBEUK - Sauvons les rôlistes  - Clip.mp3",
          "/static/temp/RASPUTIN - Vladimir Putin - Love The Way You Move (Funk Overload) @slocband.mp3",
        ],
      },
      {
        id: "123741852",
        name: "subname2",
        subPlaylist: [],
      },
      {
        id: "951741852",
        name: "subname3",
        subPlaylist: [],
      },
    ],
    memSecondListID: "",
    listMusic:[],


  },
  getters:{
    playlist(state){
      return state.listMusic
    },
    launchMainList(state){
      return state.mainList
    },
  },
  mutations: {
    changeStackLimit(state , value){
      state.stackLimit = value
    },
    changeNoRepeat(state , value){
      state.noRepeat = value
    },

    //mainList
    addInMainList(state, json){
      state.mainList.push(json)
    },
    deleteInMainList(state , id){
      // get index of object with id
      let removeIndex = state.mainList.map(function(item) { return item.id; }).indexOf(id)
      // remove object
      state.mainList.splice(removeIndex, 1)
    },
    removeMemMainListID(state){
      state.memMainListID = ""
    },
    changeMemMainListID(state , id){
      state.memMainListID = id
    },
    changeMainListPlaylist(state , array){
      let playlist = state.mainList.map(function(item) { return item.id }).indexOf(state.memMainListID)
      state.mainList[playlist].subPlaylist = array
    },
    changeMainListName(state , json ){
      let playlist = state.mainList.map(function(item) { return item.id }).indexOf(json.id)
      state.mainList[playlist].name = json.newName

    },

    //secondList
    addInSecondList(state, json){
      state.secondList.push(json)
    },
    deleteInSecondList(state , id){
      // get index of object with id
      let removeIndex = state.secondList.map(function(item) { return item.id; }).indexOf(id)
      // remove object
      state.secondList.splice(removeIndex, 1)
    },
    removeMemSecondListID(state){
      state.memSecondListID = ""
    },
    changeMemSecondListID(state , id){
      state.memSecondListID = id
    },
    changeSecondListPlaylist(state , array){
      let playlist = state.secondList.map(function(item) { return item.id }).indexOf(state.memSecondListID)
      state.secondList[playlist].subPlaylist = array
    },
    changePlaylist(state , array){
      state.listMusic = array
    },

  }


})
