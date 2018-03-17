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
      <div class="title">{{actualMusicTitle}}</div>

      <audio id="audio" controls>
        <source :src="actualMusicUrl" type="audio/mp3 audio/ogg audio/wav">
      </audio>
      <div class="center">
        <div class="float_left">
          {{actualTime}}
        </div>
        <div class="float_right">
          {{actualDuration}}
        </div>
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
      actualMusicTitle: "no music",
      actualMusicUrl: "",
      actualDuration: "duration",
      actualTime: "time",
      player: false ,
      playlist: [],
      stackPrev: [],
      prevNumber: 0,
      stackLimit: store.state.stackLimit,
      noRepeat: store.state.noRepeat,
    }
  },
  methods: {
    backward(){
      document.getElementById('audio').setAttribute('src',this.prevMusic())
      document.getElementById('audio').play()
    },
    forward(){
      document.getElementById('audio').setAttribute('src',this.nextMusic())
      document.getElementById('audio').play()
    },
    go(){
      this.player = true
      document.getElementById('audio').play()
    },
    stop(){
      this.player = false
      document.getElementById('audio').pause()
    },
    randomMusic(){
      let lastMusic = this.actualMusicUrl
      this.stackPrev.push(lastMusic)
      let boolRepeat = false
      do {
        boolRepeat = false
        let noRepeatArray = this.stackPrev.slice(Math.max(this.stackPrev.length - this.noRepeat , 1))
        let musicUrl = this.playlist[   Math.floor((Math.random() * this.playlist.length) )  ]
        for (let i of noRepeatArray) {
          if (i == musicUrl) {
            boolRepeat = true
          }
        }

        this.actualMusicUrl = musicUrl
        let array = this.actualMusicUrl.split("/")
        this.actualMusicTitle = array[array.length-1]


        //no infinte boucle
        if ( this.playlist.length <= 1) { break; }

      } while ( lastMusic == this.actualMusicUrl && boolRepeat  );
      this.verifStack()
      return this.actualMusicUrl
    },
    nextMusic(){
      let ret
      if (this.prevNumber <= 0 ) {
        this.prevNumber = 0
        ret = this.randomMusic()
      }else {
        this.prevNumber--
        ret = this.stackPrev[this.stackPrev.length - this.prevNumber - 1]
        let array = ret.split("/")
        this.actualMusicTitle = array[array.length-1]
      }
      return ret

    },
    prevMusic(){
      let n = (this.stackPrev.length - this.prevNumber)-1
      if ( n < 0 ) {
        n = 0
        this.prevNumber = this.stackPrev.length
      }else{
        this.prevNumber++
      }
      this.actualMusicUrl = this.stackPrev[n]
      let array = this.actualMusicUrl.split("/")
      this.actualMusicTitle = array[array.length-1]
      return this.actualMusicUrl

    },
    verifStack(){
      while (this.stackPrev.length > this.stackLimit) {
        this.stackPrev.shift()
      }
    }


  },
  created(){
    this.playlist = store.getters['playlist']

	},
  mounted(){
    if (  this.playlist.length != 0) {
      this.randomMusic()
      this.player = true
      document.getElementById('audio').play()
    }

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
  margin-top: 18%;
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
.title{
  height: 3em;
}
.float_left{
  float: left;
  padding-left: 10%;
}
.float_right{
  float: right;
  padding-right: 10%
}

#timeline{
	width: 76%;
	height: 15px;
	background: lightgrey;
	margin-top: 10px;

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
