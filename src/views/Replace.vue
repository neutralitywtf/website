<template>
  <v-container class="replace pa-2 diagonal" fluid fill-height>
    <v-row v-if="loading || !ready" align="center" justify="center">
      <LoadingAnimation />
    </v-row>
    <v-row v-if="error" align="center" justify="center">
      <v-col class="col-md-8 col-sm-12">
        <v-alert
          border="right"
          colored-border
          type="error"
          elevation="2"
        >
          <p class="text--primary font-weight-black">Uh oh! We could not load the requested page!</p>
          <p>Attempted URL: <a :href="requestedUrl" target="_blank">{{requestedUrl}}</a></p>
          <p>There could be several reasons for this:
            <ul>
              <li>The provided URL may be malformed or does not lead to an actual article</li>
              <li>The target website is blocked behind a paywall, or is down</li>
              <li>The URL requested <code>https://</code> instead of <code>http://</code></li>
              <li>The system may be experiencing an issue</li>
            </ul>
          </p>
          <p>If you're sure this URL is valid, try again in a few minutes.</p>
          <p>If this error persists and you think there's a problem with the system, please consider <a href="" target="_blank">submitting a bug report!</a>. Please include the content of the error below (expandable).</p>
        </v-alert>
        <v-expansion-panels class="mb-6">
          <v-expansion-panel>
            <v-expansion-panel-header>Error details (click to expand)</v-expansion-panel-header>
            <v-expansion-panel-content>
            <v-btn
              id="data-report-button"
              data-clipboard-target="#error-report-content"
              color="secondary"
              outlined
              @click="copyErrorToClipboard"
            >Copy to clipboard
            </v-btn>
            <pre id="error-report-content" >
  ## Request details:
  * Timestamp: {{getCurrentUTCTime}}
  * Requested URL: {{requestedUrl}}
  * API URL: {{apiUrl}}
  * Display type: {{this.$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop'}}

  ## Error content:
  ```
  {{errorContent}}
  ```</pre>
            <v-btn
              id="data-report-button"
              data-clipboard-target="#error-report-content"
              color="secondary"
              outlined
              @click="copyErrorToClipboard"
            >Copy to clipboard
            </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-btn
          x-large
          color="primary"
          to="/"
        >
          <v-icon left>mdi-information</v-icon>
          Try another website
        </v-btn>
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
import ClipboardJS from 'clipboard'

export default {
  name: 'Replace',
  components: { LoadingAnimation },
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
    },
    getCurrentUTCTime () {
      return new Date().toUTCString()
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
    },
    copyErrorToClipboard () {
      // eslint-disable-next-line no-unused-vars
      const clipboard = new ClipboardJS('#data-report-button')
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
