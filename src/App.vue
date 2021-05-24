<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-avatar
        class="linkable"
        color="grey lighten-5"
        size="60"
        @click="goHome"
      >
        <v-img
          contain
          max-height="50%"
          src="./assets/logo.png"
        ></v-img>
      </v-avatar>

      <v-toolbar-title
        v-if="$vuetify.breakpoint.mdAndUp"
        class="font-weight-black linkable headline"
        @click="goHome"
      >
        Neutrality.WTF
      </v-toolbar-title>

      <!-- <v-spacer
        v-if="$route.name === 'Replace' && !!$route.params.url"
      ></v-spacer> -->
      <v-btn
        v-if="$route.name === 'Replace' && !!$route.params.url"
        outlined
        small
        color="warning"
        class="mx-5"
        :href="decodeURIComponent(this.$route.params.url)"
        target="_blank"
      >
        {{originalWebsiteButtonText}}
      </v-btn>

      <v-spacer></v-spacer>
      <ShareDialog/>
      <v-spacer></v-spacer>

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        tile
        text
        to="/"
      >
        <v-icon left>
          mdi-find-replace
        </v-icon>
        FLIP
      </v-btn>

      <!-- <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        tile
        text
        to="/analyze"
      >
        <v-icon left>
          mdi-file-search
        </v-icon>
        ANALYZE
      </v-btn> -->

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        tile
        text
        to="/dictionary"
      >
        <v-icon left>
          mdi-book-open-variant
        </v-icon>
        DICTIONARY TERMS
      </v-btn>

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        tile
        text
        to="/about"
      >
        <v-icon left>
          mdi-information
        </v-icon>
        ABOUT
      </v-btn>

      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="sidemenu = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="sidemenu"
      app
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

        <!-- <v-list-item to="/analyze">
          <v-list-item-icon>
            <v-icon>mdi-file-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Analyze Language</v-list-item-title>
        </v-list-item> -->

        <v-list-item to="/dictionary">
          <v-list-item-icon>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dictionary terms</v-list-item-title>
        </v-list-item>

        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About this tool</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      v-if="$route.name !== 'Replace'"
      color="secondary"
      class="py-5"
    >
      <v-card
        flat
        tile
        width="100%"
        class="secondary text-center"
      >
      <v-row>
        <v-col>
          <v-btn
            text
            color="#ffb6d9"
            href="https://github.com/neutralitywtf/website/"
            target="_blank"
          >
            <v-icon left>mdi-github</v-icon>
            neutralitywtf is open source
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            text
            color="#aedcff"
            href="http://www.twitter.com/mooeypoo"
            target="_blank"
          >
            <v-icon left>mdi-twitter</v-icon>
            mooeypoo
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            text
            color="white"
            to="/about"
          >
            <v-icon left>mdi-information</v-icon>
            About Neutrality.WTF
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import ShareDialog from './components/ShareDialog'

export default {
  name: 'App',
  components: { ShareDialog },
  data: () => ({
    sidemenu: false,
    group: null
  }),
  computed: {
    originalWebsiteButtonText () {
      return this.$vuetify.breakpoint.smAndDown
        ? 'Original' : 'Visit original website'
    }
  },
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
  max-width: 100% !important;
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
