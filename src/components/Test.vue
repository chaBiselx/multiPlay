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
  },
  async created(){
    this.data1.push("start");
    let test = this.data3 ///******

    //let temp


    this.data1.push(MediaRetrieve.getAudioList(
        function(data){
          test.push(data)
          //test.push(data) //*****
        }
      )
    )

    //this.data2 = temp[0].data

    this.data1.push("end")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
