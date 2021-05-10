<template>
  <div>
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
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  name: 'ReplacerError',
  props: [
    'requestedUrl',
    'apiUrl',
    'errorContent'
  ],
  computed: {
    getCurrentUTCTime () {
      return new Date().toUTCString()
    }
  },
  methods: {
    copyErrorToClipboard () {
      // eslint-disable-next-line no-unused-vars
      const clipboard = new ClipboardJS('#data-report-button')
    }
  }
}
</script>
