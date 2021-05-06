<template>
  <v-container class="replace pa-2 diagonal" fluid fill-height>
    <v-row v-if="loading || !ready" align="center" justify="center">
      <LoadingAnimation />
    </v-row>
    <iframe
      :src="apiUrl"
      v-show="ready && !loading"
      @load="onIframeReady"
      :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
    >
    </iframe>
  </v-container>
</template>

<script>
import LoadingAnimation from '../components/LoadingAnimation'
export default {
  name: 'Replace',
  components: { LoadingAnimation },
  data () {
    return {
      loading: false,
      ready: false,
      apiUrl: ''
    }
  },
  methods: {
    async fetchUrl (url) {
      this.ready = false
      const viewtype = this.$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop'
      this.apiUrl = `/api/replace/${viewtype}/${url}`
      console.log('apiUrl', this.apiUrl)
    },
    onIframeReady () {
      this.loading = false
      this.ready = true
    }
  },
  mounted () {
    this.loading = true
    this.ready = false
    // TODO: Also, validate URL
    if (!this.$route.params.url) {
      // Reroute to home
      // TODO: Pass an error message?
      this.$router.push({ name: 'Home' })
    } else {
      // Load the url
      this.fetchUrl(this.$route.params.url)
    }
  }
}
</script>

<style lang="less">
iframe {
  width: 100%;

  &.desktop {
    // Header height - padding and extra
    height: calc(100vh - 64px - 15px);
  }

  &.mobile {
    // Header height - padding and extra
    height: calc(100vh - 54px - 20px);
  }
}
</style>
