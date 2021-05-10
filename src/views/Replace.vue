<template>
  <v-container class="replace pa-2 diagonal" fluid fill-height>
    <v-row v-if="loading || !ready" align="center" justify="center">
      <LoadingAnimation />
    </v-row>
    <v-row v-if="error" align="center" justify="center">
      <v-col class="col-md-8 col-sm-12">
        <ReplacerError :requestedUrl="requestedUrl" :apiUrl="apiUrl" :errorContent="errorContent" />
      </v-col>
    </v-row>
    <iframe
      id="display-iframe"
      :src="apiUrl"
      v-show="ready && !loading && !error"
      @load="onIframeReady"
      :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
    >
    </iframe>
  </v-container>
</template>

<script>
import LoadingAnimation from '../components/LoadingAnimation'
import ReplacerError from '../components/ReplacerError'

export default {
  name: 'Replace',
  components: { LoadingAnimation, ReplacerError },
  data () {
    return {
      error: false,
      errorContent: '',
      loading: false,
      ready: false,
      apiUrl: ''
    }
  },
  computed: {
    requestedUrl () {
      return decodeURIComponent(this.$route.params.url)
    }
  },
  methods: {
    async fetchUrl (url) {
      this.ready = false
      const viewtype = this.$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop'
      this.apiUrl = `/api/replace/${viewtype}/${url}`
      console.log('apiUrl', this.apiUrl)
    },
    isIframeContentValid () {
      const iframe = document.querySelector('#display-iframe')
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document
      this.errorContent = iframeDocument.body.textContent

      if (iframeDocument) {
        try {
          JSON.parse(iframeDocument.body.textContent)
          return false
        } catch (e) {
          // No json string found
          // Verify it's not timeout error from netlify function
          if (iframeDocument.body.textContent.startsWith('TimeoutError')) {
            return false
          }
          return true
        }
      }
      return false
    },
    onIframeReady () {
      // Check if what we received is an error
      if (!this.isIframeContentValid()) {
        // Error!
        this.error = true
      }
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
