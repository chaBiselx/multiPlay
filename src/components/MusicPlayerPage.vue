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

    <div class="text-center">
      <span class="title">{{actualMusicTitle}}</span>

      <audio id="audio" controls>
        <source :src="actualMusicUrl" type="audio/mp3 audio/ogg audio/wav">
      </audio>
      <div class="center">
        <div id="timeline">
        	<div id="playhead"></div>
        </div>
      </div>

      <div class="btn-list">
        <span class="btn-left">
          <v-ons-icon class="buttonMusic" icon="ion-skip-backward" @click="backward()"></v-ons-icon>
        </span>
        <span class="btn-center" v-if="!player">
          <v-ons-icon class="buttonMusic" icon="ion-play" @click="go()"></v-ons-icon>
        </span>
        <span class="btn-center" v-else>
          <v-ons-icon class="buttonMusic" icon="ion-pause" @click="stop()"></v-ons-icon>
        </span>
        <span class="btn-right">
          <v-ons-icon class="buttonMusic" icon="ion-skip-forward" @click="forward()"></v-ons-icon>
        </span>
      </div>

    </div>


  </v-ons-page>
</template>

<script>
  import store from '@/store'

export default {
  name: 'homePage',
  data () {
    return {
      actualMusicTitle: "test",
      actualMusicUrl: "",
      player: false ,
      audio: {} ,
      playlist: [

      ],

    }
  },
  methods: {
    backward(){
      console.log('backward');
    },
    forward(){
      this.actualMusicUrl = store.getters['nextMusic'] //retourne la même musique
    },
    go(){
      this.player = true
      document.getElementById('audio').play()
    },
    stop(){
      this.player = false
      document.getElementById('audio').pause()
    },


  },
  created(){
    this.actualMusicUrl = store.getters['nextMusic']
	},
  mounted(){
    this.player = true
    document.getElementById('audio').play()
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

.text-center {
  margin-top: 10%;
  text-align: center;
}
.btn-list{
  margin-top: 16%;
  margin-left:  10%;
  margin-right: 10%;
  border: solid;
  border-width: thin;
  border-color: #cc3399;
  border-radius: 10px;

}
.buttonMusic{
  padding: 10%;
  font-size: 6vw;
  width: 20px;
  height: 30px;

}
#timeline{
	width: 76%;
	height: 15px;
	background: lightgrey;
	margin-top: 20px;

  margin-left: 12%;
  margin-right: 12%;

	float: left;
	border-radius: 15px;

}

#playhead{
	width: 13px;
	height: 13px;
	border-radius: 50%;
	margin-top: 1px;
	background: #cc3399;
}

</style>
