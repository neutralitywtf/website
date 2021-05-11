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
    <v-dialog
      v-model="ambiguousDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Ambiguous replacements
        </v-card-title>

        <v-card-text>
          This word has been marked as "ambiguous", which means that the original word has several options for replacements. The system can't tell which to choose, because it doesn't know context, which makes these ambiguous replacements often wrong.
        </v-card-text>

        <v-card-text>
          <p>An example of an ambiguous word is <strong>"her"</strong> being replaced with either <strong>"him"</strong> or <strong>"his"</strong> depending on context.</p>
          <p>Since the system has no understanding of context, the substitution may be wrong.</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="ambiguousDialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      iFrameEventListeners: {},
      error: false,
      errorContent: '',
      loading: false,
      ready: false,
      apiUrl: '',
      ambiguousDialog: false
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
      this.removeIframeEventListeners()
      const viewtype = this.$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop'
      this.apiUrl = `/api/replace/${viewtype}/${url}`
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
    cleanupKnownSitesInIframe () {
      // There are known display issues with some websites;
      // Clean up the DOM for those
      const knownSitesToFix = [
        'www.wikihow.com'
      ]

      const urlobj = new URL(this.requestedUrl)
      if (knownSitesToFix.indexOf(urlobj.hostname) === -1) {
        return
      }

      const iframe = document.querySelector('#display-iframe')
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document

      const header = iframeDocument.getElementById('header_container')
      if (
        urlobj.hostname === 'www.wikihow.com' &&
        // Wikihow in mobile
        this.$vuetify.breakpoint.smAndDown &&
        header
      ) {
        header.style.position = 'absolute'
      }
    },
    onIframeReady () {
      // Check if what we received is an error
      if (!this.isIframeContentValid()) {
        // Error!
        this.error = true
      }
      this.cleanupKnownSitesInIframe()
      this.addIframeEventListeners()
      this.loading = false
      this.ready = true
    },
    addIframeEventListeners () {
      const iframe = document.querySelector('#display-iframe')
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document

      this.iFrameEventListeners.openAmbiguousDialog = this.iFrameEventListeners.openAmbiguousDialog || []
      const elements = iframeDocument.getElementsByClassName('neutralitywtf-term-ambiguous')
      Array.from(elements).forEach(element => {
        this.iFrameEventListeners.openAmbiguousDialog.push(element)
        element.addEventListener('click', this.onIframeAmbiguousClick)
      })
    },
    removeIframeEventListeners () {
      Object.keys(this.iFrameEventListeners).forEach(eventName => {
        this.iFrameEventListeners[eventName].forEach(element => {
          element.removeEventListener(eventName, this.onIframeAmbiguousClick, false)
        })
      })
      this.iFrameEventListeners = {}
    },
    onIframeAmbiguousClick (e) {
      this.ambiguousDialog = true
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
