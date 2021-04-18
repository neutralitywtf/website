<template>
  <v-container class="home">
    <h1>Fetch test</h1>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="requestUrl"
          :rules="urlRules"
          label="Url"
          required
        ></v-text-field>
        <v-btn
          :disabled="!requestUrl || !valid"
          color="success"
          class="mr-4"
          @click="fetchUrl"
        >
          Replace
        </v-btn>
      </v-form>
      <img v-if="loading" src="../assets/loading-200px.gif" />
    <iframe v-if="ready" :srcdoc="flippedHtml" width="100%" min-height="60vh"></iframe>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      valid: false,
      loading: false,
      requestUrl: '',
      urlRules: [
        v => !!v || 'URL is required.',
        v => (new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i')).test(v) || 'URL is invalid.'
      ],
      ready: false,
      flippedHtml: ''
    }
  },
  components: {
  },
  methods: {
    async fetchUrl () {
      this.loading = true
      this.ready = false
      const encodedUrl = encodeURIComponent(this.requestUrl)
      // this.ready = false
      const resp = await fetch(`/.netlify/functions/replace/${encodedUrl}/desktop`)
      this.flippedHtml = (await resp.text())
      this.loading = false
      this.ready = true
    }
  },
  async created () {
  }
}
</script>
