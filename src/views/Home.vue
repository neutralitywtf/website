<template>
  <v-container class="home pa-0 diagonal" fluid fill-height>
    <v-row no-gutters align="center" justify="center">
      <section id="hero" class="pa-10">
        <v-row no-gutters>
            <v-theme-provider>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="mx-auto"
                  justify="center"
                >
                  <v-col
                    class="text-center"
                    cols="12"
                    tag="h1"
                  >
                    <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                      class="font-weight-light"
                    >
                      Flip the script on
                    </span>

                    <br>

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      Gendered Language
                    </span>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  class="mx-auto"
                  justify="center"
                >
                  <v-col
                    class="text-center"
                    cols="12"
                  >
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      @submit.prevent="fetchUrl"
                    >
                      <v-row>
                        <v-col cols="12" sm="10" :class="[$vuetify.breakpoint.smAndDown ? 'pb-0' : '']">
                          <v-text-field
                            v-model="requestUrl"
                            :rules="urlRules"
                            label="https://"
                            type="text"
                            @click:append-outer="fetchUrl"
                            solo
                            light
                            clearable
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" :class="[$vuetify.breakpoint.smAndDown ? 'pt-0' : '']">
                          <v-btn
                            :disabled="!requestUrl || !valid"
                            color="secondary"
                            class="mt-2"
                            @click.stop.prevent="fetchUrl"
                            x-large
                          >
                            <v-icon left>mdi-find-replace</v-icon>
                            Replace
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>

                  </v-col>

                  <!-- <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn> -->
                </v-row>
              </v-container>
            </v-theme-provider>
        </v-row>
      </section>
    </v-row>
    <!-- <h1>Fetch test</h1>
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
    <iframe v-show="ready" @load="onIframeLoaded" :src="apiUrl" width="100%"></iframe> -->
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      valid: false,
      requestUrl: '',
      urlRules: [
        v => (new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i')).test(v) || 'URL is invalid.'
      ],
      ready: false,
      apiUrl: ''
    }
  },
  components: {
  },
  methods: {
    async fetchUrl () {
      const encodedUrl = encodeURIComponent(this.requestUrl)
      this.$router.push({ name: 'Replace', params: { url: encodedUrl } })
    }
  },
  async created () {
  }
}
</script>

<style lang="less">
iframe {
  min-height: 60vh;
}
</style>
