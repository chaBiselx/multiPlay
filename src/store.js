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
    mainList: [
      {
        id: "123789456",
        name: "name1",
        subPlaylist: [],
      },
      {
        id: "987654321",
        name: "name2",
        subPlaylist: [],
      },
      {
        id: "123456789",
        name: "name3",
        subPlaylist: [],
      }
    ],


  },
  mutations: {
    addInMainList(state, json){
      state.mainList.push(json)
    },
    deleteInMainList(state , id){
      // get index of object with id
      let removeIndex = state.mainList.map(function(item) { return state.mainList.id; }).indexOf(id)
      // remove object
      state.mainList.splice(removeIndex, 1)
    },
  }


})
