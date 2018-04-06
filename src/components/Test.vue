<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left pointer">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">
        <img class="logo" src="@/assets/img/MultiPlay.png" alt="">
        MultiPlay
      </div>
    </v-ons-toolbar>

    <div class="center text">
      <h1>Multiplay</h1>

      <p>data1 : {{data1}}</p>
      <p>data2 : {{data2}}</p>
      <p>data3 : {{data3}}</p>
      <p>data4 : {{data4}}</p>
      <p>data5 : {{data5}}</p>
      <p>data6 : {{data6}}</p>




    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      data1 : [],
      data2 : [],
      data3 : [],
      data4 : [],
      data5 : [],
      data6 : [],
    }
  },
  methods: {
    listDir(path){
      let test = this.data3
      window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
          test.push(fileSystem)
          let reader = fileSystem.createReader()
          reader.readEntries(
            function (entries) {
              test = entries[0]
            },
            function (err) {
              test = err
            }
          );
        }, function (err) {
          test = err
        }
      );
    },
    onSuccessCallBack(e){
      this.data1.push("sucess")
      this.data5 = JSON.stringify(e)
      this.data6 = 'e ='+e

    },
    onErrorCallBack(e){
      this.data1.push("error")

      this.data5 = JSON.stringify(e)
    }



  },
  async created(){
    this.data1.push("start")
    //this.listDir(cordova.file.externalDataDirectory)
    let coucou = this.data6
    await cordova.file.externalDataDirectory.getAudioList(this.onSuccessCallBack())


    this.data1.push("end")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
