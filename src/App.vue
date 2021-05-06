<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-avatar
        class="mr-3"
        color="grey lighten-5"
        size="70"
      >
        <v-img
          contain
          max-height="50%"
          src="./assets/logo.png"
        ></v-img>
      </v-avatar>

      <v-toolbar-title class="font-weight-black headline">
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
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  })
}
</script>

<style lang="less">
.v-application--wrap {
  max-width: none !important;
}

.diagonal {
  background:#e0006c;
  background: linear-gradient(to right bottom, #e0006c 50%, #0081e3 50%);
}

</style>
