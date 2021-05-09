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
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          tile
          text
          to="/"
        >
          <v-icon left>
            mdi-find-replace
          </v-icon>
          FLIP
        </v-btn>

        <v-btn
          tile
          text
          to="/analyze"
        >
          <v-icon left>
            mdi-file-search
          </v-icon>
          ANALYZE
        </v-btn>

        <v-btn
          tile
          text
          to="/about"
        >
          <v-icon left>
            mdi-information
          </v-icon>
          ABOUT
        </v-btn>
      </div>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="sidemenu = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="sidemenu"
      absolute
      temporary
    >
    <v-list-item @click="goHome">
      <v-list-item-content>
        <v-avatar
          class="mr-3 linkable"
          color="grey lighten-5"
          size="75"
        >
          <v-img
            contain
            max-height="50%"
            src="./assets/logo.png"
          ></v-img>
        </v-avatar>
        <v-list-item-title class="title">
          Neutrality.WTF
        </v-list-item-title>
        <v-list-item-subtitle>
          Flip the script
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          on gendered language
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-find-replace</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Flip Language</v-list-item-title>
        </v-list-item>

        <v-list-item to="/analyze">
          <v-list-item-icon>
            <v-icon>mdi-file-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Analyze Language</v-list-item-title>
        </v-list-item>

        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About this toolbar</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

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
    sidemenu: false,
    group: null
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

.linkable {
  cursor: pointer;
}
</style>
