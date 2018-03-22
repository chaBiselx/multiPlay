import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


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
    load: false,
    stackLimit: "25",
    noRepeat: "10",
    mainList: [
    ],
    memMainListID: "",
    secondList: [
    ],
    memSecondListID: "",
    listMusic:[],


  },
  getters:{ //getters['name']
    playlist(state){
      return state.listMusic
    },
    launchMainList(state){
      return state.mainList
    },
  },
  mutations: { //commit('name')
    changeLoad(state , value){
      state.load = value
    },
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
      let id = state.mainList.map(function(item) { return item.id }).indexOf(json.id)
      state.mainList[id].name = json.newName
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
    changeSecondListName(state , json ){
      let id = state.secondList.map(function(item) { return item.id }).indexOf(json.id)
      state.secondList[id].name = json.newName
    },
    save(state){
      let mList = []
      for (let i of state.mainList) {
        let tempJson = {
          "id": i.id,
          "name": i.name,
          "subPlaylist": i.subPlaylist,
        }
        mList.push(tempJson)
      }
      let sList = []
      for (let i of state.secondList) {
        let tempJson = {
          "id": i.id,
          "name": i.name,
          "subPlaylist": i.subPlaylist,
        }
        sList.push(tempJson)
      }
      let json = {
        "stackLimit": state.stackLimit,
        "noRepeat": state.noRepeat,
        "mainList": mList,
        "secondList": sList,
        "listMusic": state.listMusic
      }
      let nameFile = "data.json";
      let str = JSON.stringify(json);
      let path = "/src/data.json";
      // /*

      window.localStorage.setItem("data", str);







      // */
    },

  },
  actions: { //dispatch('name')
    changeOption({commit} , value){
      commit('changeNoRepeat', value.NoRepeat)
      commit('changeStackLimit', value.StackLimit)

      commit('save')
    },


    addInMainList({commit}, json){
      commit('addInMainList', json)
      commit('save')
    },
    deleteInMainList({commit} , id){
      commit('deleteInMainList', id)
      commit('save')
    },
    changeMainListPlaylist({commit} , array){
      commit('changeMainListPlaylist', array)
      commit('save')
    },
    changeMainListName({commit}, json){
      commit('changeMainListName', json)
      commit('save')
    },

    addInSecondList({commit}, json){
      commit('addInSecondList', json)
      commit('save')
    },
    deleteInSecondList({commit} , id){
      commit('deleteInSecondList', id)
      commit('save')
    },
    changeSecondListPlaylist({commit} , array){
      commit('changeSecondListPlaylist', array)
      commit('save')
    },
    changePlaylist({commit} , array){
      commit('changePlaylist', array)
      commit('save')
    },
    changeSecondListName({commit} , json ){
      commit('changeSecondListName', json)
      commit('save')
    },
    async loadData({commit,state}){
      let resp = JSON.parse(window.localStorage.getItem("data"))
      if (resp.stackLimit != undefined) {
        state.stackLimit =  resp.stackLimit
        state.noRepeat =    resp.noRepeat
        state.listMusic =   resp.listMusic

        let array1 = []
        for (let i of resp.mainList) {
          let tempJson = {
            id: i.id,
            name: i.name,
            subPlaylist: i.subPlaylist,
          }
          array1.push(tempJson)
        }
        state.mainList = array1

        let array2 = []
        for (let i of resp.secondList) {
          let tempJson = {
            id: i.id,
            name: i.name,
            subPlaylist: i.subPlaylist,
          }
          array2.push(tempJson)
        }
        state.secondList = array2
      }

      return true
    },
  }


})
