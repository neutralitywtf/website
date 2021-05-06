<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-avatar
        class="mr-3 linkable"
        color="grey lighten-5"
        size="70"
        @click="goHome"
      >
        <v-img
          contain
          max-height="50%"
          src="./assets/logo.png"
        ></v-img>
      </v-avatar>

      <v-toolbar-title
        class="font-weight-black headline linkable"
        @click="goHome"
      >
        Neutrality.WTF
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data: () => ({
  }),
  methods: {
    goHome () {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style lang="less">
.v-application--wrap {
  max-width: none !important;
}

.diagonal {
  background-image: repeating-linear-gradient(
    43deg,
    #ffb6d9 70px,
    #ffb6d9 calc(140px),
    #cccccc calc(140px),
    #cccccc calc(150px),
    #aedcff calc(150px),
    #aedcff calc(220px),
    #cccccc calc(220px),
    #cccccc calc(230px)),
    none;
  // background-size: 200px 100%, 200px 100%;
}

// .diagonal::after {
//   background-image: repeating-linear-gradient(calc(-43deg), #e0006c 70px, #e0006c calc(140px), #0081e3 calc(140px), #0081e3 calc(210px), rgb(17, 57, 69) calc(210px), rgb(17, 57, 69) calc(280px)), none;
//   background-size: 200px 100%, 200px 100%;
//   -webkit-mask-image: repeating-linear-gradient(to right, rgb(0, 0, 0) 200px, rgb(0, 0, 0) calc(400px), rgba(0, 0, 0, 0) calc(400px), rgba(0, 0, 0, 0) calc(600px));
//   mask-image: repeating-linear-gradient(to right, rgb(0, 0, 0) 200px, rgb(0, 0, 0) calc(400px), rgba(0, 0, 0, 0) calc(400px), rgba(0, 0, 0, 0) calc(600px));
// }
.linkable {
  cursor: pointer;
}
</style>
