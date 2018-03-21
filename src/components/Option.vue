<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
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
      <h1>Option</h1>
      <form class="" action="index.html" method="post">
        <div class="form-group center">
          <label for="stackLimit"> Nombre de retour en arrière dans la playlist possible</label>
          <input type="number" name="stackLimit" v-model="stackLimit" min="1">
        </div>
        <div class="form-group center">
          <label for="noRepeat"> Nombre de musique avant une possibilité de réécouter la musique actuelle</label>
          <input type="number" name="noRepeat" v-model="noRepeat" min="1">
        </div>
        <div class="form-group end">
          <ons-button class="finalButton"  type="submit" @click="saveOption()">Sauvegarder</ons-button >
          <ons-button class="finalButton"  type="button" @click="init()">Réinitialiser</ons-button >
        </div>
      </form>

    </div>
  </v-ons-page>
</template>

<script>
  import store from '@/store'


export default {
  name: 'about',
  data () {
    return {
      stackLimit: "",
      noRepeat: ""
    }
  },
  methods: {
    saveOption(){
      if (this.stackLimit <1) {
        this.stackLimit=1
      }
      if (this.noRepeat <1) {
        this.noRepeat=1
      }
      let json = {
        "StackLimit":this.stackLimit,
        "NoRepeat":this.noRepeat
      }
      store.dispatch('changeOption',json)

      this.$ons.notification.toast({
        animation: "fall",
        message: 'Sauvegardé!',
        timeout: 2000
      }).then(i => this.shutUp = i === 0);
    },
    async init(){
      //don't delete or modify
      //default value
      let r = await this.$ons.notification.confirm('Tous les paramètres vont être réinitialiser!',{"title":"ATTENTION"})
      if (r == 1) {
        this.stackLimit = "25"
        this.noRepeat = "10"
        this.saveOption();
      }

    }

  },
  created(){
    this.stackLimit = store.state.stackLimit
    this.noRepeat = store.state.noRepeat
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
.text{
  margin: 15px;
}
.text h1{
  text-align: center;
}
.form-group{
  width: 80%;
  margin: 10px 10% 10px 10%;
}
.form-group label{
  display: block
}
input{
  height: 1.1em;
  margin-top: 5px;
  width: 60%;
}
.finalButton{
  display: block;
  width: 70%;
  margin: 10px 15% 10px 15%;
  text-align: center;
}
.end{
  margin-top: 50px
}
.logo{
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
</style>
