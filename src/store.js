import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    },
    mainPlaylist: {
      data:{
        list: [
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
      getters: {
        getMainList(){
          return this.data.list
          //return "coco"
        }
      },
      mutations: {
        addInMainList(json){

        },
        deleteInMainList(id){

        },
      }
    },

  },

})
