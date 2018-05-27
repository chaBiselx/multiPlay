<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
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

    <div class="text-center">
      <div class="title">{{ actualMusicTitle }}</div>

      <audio
        id="audio"
      >
        <source
          :src="actualMusicUrl"
          type="audio/mp3 audio/ogg audio/wav"
        >
      </audio>
      <!--div class="center">
        <div class="float_left">
          {{actualTime}}
        </div>
        <div class="float_right">
          {{actualDuration}}
        </div>
        <div id="timeline">
          <div id="playhead"></div>
        </div>
      </div-->

      <div class="btn-list">
        <span class="btn-left">
          <v-ons-icon
            class="buttonMusic"
            icon="ion-skip-backward"
            @click="backward()"
          />
        </span>
        <span
          v-if="!player"
          class="btn-center"
        >
          <v-ons-icon
            class="buttonMusic"
            icon="ion-play"
            @click="go()"
          />
        </span>
        <span
          v-else
          class="btn-center"
        >
          <v-ons-icon
            class="buttonMusic"
            icon="ion-pause"
            @click="stop()"
          />
        </span>
        <span class="btn-right">
          <v-ons-icon
            class="buttonMusic"
            icon="ion-skip-forward"
            @click="forward()"
          />
        </span>
      </div>

    </div>


  </v-ons-page>
</template>

<script>
import store from '@/store'
export default {
  name: 'HomePage',
  data() {
    return {
      actualMusicTitle: 'Absence de musique',
      actualMusicUrl: '',
      actualDuration: 'durée',
      actualTime: 'temps',
      player: false,
      playlist: [],
      stackPrev: [],
      actualNumber: 0,
      stackLimit: store.state.stackLimit,
      noRepeat: store.state.noRepeat,
    }
  },
  created() {
    if (store.getters['playlist'].length == 0) {
      this.$router.push({ name: 'HomePage' })
      this.$ons.notification
        .toast({
          animation: 'fall',
          message: 'Aucune musique !',
          timeout: 2000,
        })
        .then(i => (this.shutUp = i === 0))
    } else {
      this.playlist = store.getters['playlist']
    }
  },
  mounted() {
    let globalThis = this
    this.forward()
    document.getElementById('audio').addEventListener('ended', () => {
      globalThis.forward()
    })
    if (store.state.lockSwitch) {
      globalThis.$ons.notification
        .toast({
          animation: 'fall',
          message: store.state.lockSwitch,
          timeout: 2000,
        })
        .then(i => (globalThis.shutUp = i === 0))
      // window.addEventListener(
      //   'batterystatus',
      //   status => {
      //     globalThis.$ons.notification
      //       .toast({
      //         animation: 'fall',
      //         message: 'sur batterie ' + status.isPlugged,
      //         timeout: 2000,
      //       })
      //       .then(i => (globalThis.shutUp = i === 0))
      //   },
      //   false,
      // )
    }
  },
  methods: {
    backward() {
      document.getElementById('audio').setAttribute('src', this.prevMusic())
      document.getElementById('audio').play()
      this.player = true
    },
    forward() {
      document.getElementById('audio').setAttribute('src', this.nextMusic())
      document.getElementById('audio').play()
      this.player = true
    },
    go() {
      this.player = true
      document.getElementById('audio').play()
    },
    stop() {
      this.player = false
      document.getElementById('audio').pause()
    },
    randomMusic() {
      let lastMusic = this.actualMusicUrl
      if (lastMusic != '' && this.stackPrev[0] != this.actualMusicUrl) {
        this.stackPrev.push(lastMusic)
      }
      let boolRepeat
      let n = 0
      do {
        boolRepeat = false
        let noRepeatArray = this.stackPrev.slice(
          Math.max(this.stackPrev.length - this.noRepeat, 1),
        )
        let musicUrl = this.playlist[
          Math.floor(Math.random() * this.playlist.length)
        ]
        if (this.playlist.length >= this.noRepeat) {
          for (let i of noRepeatArray) {
            if (i == musicUrl) {
              boolRepeat = true
            }
          }
        }
        this.actualMusicUrl = musicUrl
        let array = this.actualMusicUrl.split('/')
        this.actualMusicTitle = array[array.length - 1].replace(
          array[array.length - 1].substr(
            array[array.length - 1].lastIndexOf('.'),
          ),
          '',
        )
        if (n > 20) {
          break
        }
        //no infinte boucle
        if (this.playlist.length <= 1) {
          break
        }
      } while (lastMusic == this.actualMusicUrl || boolRepeat)
      this.verifStack()
      return this.actualMusicUrl
    },
    nextMusic() {
      let ret
      this.actualNumber--
      let n = this.stackPrev.length - this.actualNumber
      if (this.actualNumber < 0 || n >= this.stackPrev.length) {
        this.actualNumber = 0
        ret = this.randomMusic()
      } else {
        ret = this.stackPrev[n]
        let array = ret.split('/')
        this.actualMusicTitle = array[array.length - 1].replace(
          array[array.length - 1].substr(
            array[array.length - 1].lastIndexOf('.'),
          ),
          '',
        )
      }
      return ret
    },
    prevMusic() {
      let ret
      if (this.actualNumber == 0) {
        //premier retour en arrière pour enregistrer
        let lastMusic = this.actualMusicUrl
        if (lastMusic != '') {
          this.stackPrev.push(lastMusic)
          this.actualNumber++
        }
      }
      this.actualNumber++
      if (this.actualNumber >= this.stackPrev.length) {
        this.actualNumber = this.stackPrev.length
      }
      let n = this.stackPrev.length - this.actualNumber
      this.actualMusicUrl = this.stackPrev[n]
      let array = this.actualMusicUrl.split('/')
      this.actualMusicTitle = array[array.length - 1].replace(
        array[array.length - 1].substr(
          array[array.length - 1].lastIndexOf('.'),
        ),
        '',
      )
      ret = this.actualMusicUrl
      return ret
    },
    verifStack() {
      while (this.stackPrev.length > this.stackLimit) {
        this.stackPrev.shift()
      }
    },
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
  margin-top: 10%;
  text-align: center;
}
.btn-list {
  margin-top: 18%;
  margin-left: 10%;
  margin-right: 10%;
  border: solid;
  border-width: thin;
  border-color: #cc3399;
  border-radius: 10px;
}
@media screen and (orientation: landscape) {
  .btn-list {
    margin-top: 7%;
  }
  .text-center {
    margin-top: 5%;
  }
}
.buttonMusic {
  padding: 10%;
  font-size: 6vw;
  width: 20px;
  height: 30px;
}
.title {
  height: 3em;
}
.float_left {
  float: left;
  padding-left: 10%;
}
.float_right {
  float: right;
  padding-right: 10%;
}
#timeline {
  width: 76%;
  height: 15px;
  background: lightgrey;
  margin-top: 10px;
  margin-left: 12%;
  margin-right: 12%;
  float: left;
  border-radius: 15px;
}
#playhead {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  margin-top: 1px;
  background: #cc3399;
}
</style>
