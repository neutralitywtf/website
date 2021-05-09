<template>
  <div>
    <v-container
      class="home pa-0 diagonal"
      fluid
      fill-height
      :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
    >
      <v-row no-gutters align="center" justify="center">
        <section
          id="hero"
          :class="[$vuetify.breakpoint.smAndDown ? '' : 'pa-10']"
        >
          <v-row no-gutters>
              <v-theme-provider>
                <v-container fill-height>
                  <v-row
                    align="center"
                    class="mx-auto"
                    justify="center"
                  >
                    <v-col>

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
                          :class="[$vuetify.breakpoint.smAndDown ? 'text-h6' : 'text-h5']"
                            class="font-weight-light"
                          >
                            Flip the script on
                          </span>

                          <br>

                          <span
                            :class="[$vuetify.breakpoint.smAndDown ? 'text-h4': 'text-h3']"
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
                              <v-col
                                class="pa-0 col-7 col-md-10 col-lg-10 col-xl-10"
                              >
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
                              <v-col
                                class="pa-0 ma-0 col-5 col-md-2 col-lg-2 col-xl-2"
                              >
                                <v-btn
                                  :disabled="!requestUrl || !valid"
                                  color="secondary"
                                  class="ma-0"
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
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-card
                            class="explanation-box mx-auto"
                            elevation="2"
                            outlined
                            shaped
                          >
                            <v-card-text>
                              Get some insight about the neutrality of online pages by typing a valid URL in the input above, and the system will show it to you with binary gender terms switched around.
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-auto"
                    justify="center"
                  >
                    <v-col align="center" justify="center">
                      <p>Want to quickly test this? Here are some examples</p>

                      <v-btn
                        small
                        class="ma-2"
                        @click="goToExample('https://en.wikipedia.org/wiki/Ada_Lovelace')"
                      >
                        <v-icon left>mdi-wikipedia</v-icon>
                        Ada Lovelace
                      </v-btn>
                      <v-btn
                        small
                        class="ma-2"
                        @click="goToExample('https://money.cnn.com/2017/08/21/news/economy/girls-who-code-saujani/index.html')"
                      >
                        <v-icon left>mdi-book-open</v-icon>
                        (CNN) Men build tech to replace their mothers
                      </v-btn>
                      <v-btn
                        small
                        class="ma-2"
                        @click="goToExample('https://www.wikihow.com/Date-Girls')"
                      >
                        <v-icon left>mdi-book-open</v-icon>
                        (WikiHow) How to date girls
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-auto"
                    justify="center"
                  >
                    <v-col align="center" justify="center">
                      <v-btn
                        outlined
                        x-large
                        color="secondary"
                        @click="$vuetify.goTo('#home-info')"
                      >
                        <v-icon left>mdi-chevron-double-down</v-icon>
                        But there are caveats...
                      </v-btn>

                    </v-col>
                  </v-row>
                </v-container>
              </v-theme-provider>
          </v-row>
        </section>
      </v-row>
    </v-container>
    <v-container class="home-info pa-0" fluid fill-height>
      <v-row no-gutters>
        <section id="home-info">
          <v-row
            align="center"
            class="mx-auto"
            justify="center"
          >
            <v-col>
              <div
                class="info-box info-box-main my-10"
                :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
              >
                <div class="info-box-title px-10">
                  <div class="text-overline">But wait a minute...</div>
                  <p class="text--primary" :class="[$vuetify.breakpoint.smAndDown ? 'text-h4' : 'text-h4']">
                    Things aren't that simple...
                  </p>
                </div>
              </div>

              <div
                class="info-box mt-15"
                :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
              >
                <div class="info-box-title px-10">
                  <p class="" :class="[$vuetify.breakpoint.smAndDown ? 'text-h6' : 'text-h5']">
                    <v-icon>mdi-arrow-right-bold</v-icon>Gender isn't binary.
                  </p>
                </div>
                <div class="info-box-content">
                  <p>
                    Gender is a spectrum, and gender neutral pronouns are entirely valid.
                  </p>
                  <p>
                    This exercise is not meant to erase gender fluidity; it's meant to expose <strong>gendered language</strong>, which tends to be binary.
                  </p>
                </div>
              </div>

              <div
                class="info-box my-5"
                :class="[$vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']"
              >
                <div class="info-box-title px-10">
                  <p class="" :class="[$vuetify.breakpoint.smAndDown ? 'text-h6' : 'text-h5']">
                    <v-icon>mdi-arrow-right-bold</v-icon>All text depends on context
                  </p>
                </div>
                <div class="info-box-content">
                  <p>
                    This tool should be a conversation starter. Not a discussion-ending hammer. <strong>Context matters.</strong>
                  </p>
                </div>
              </div>
              <div
                class="info-about-button my-10"
              >
                <v-btn
                  x-large
                  color="primary"
                  to="/about"
                >
                  <v-icon left>mdi-information</v-icon>
                  Read more in the About page
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </section>
      </v-row>
    </v-container>
  </div>
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
    },
    goToExample (url) {
      this.requestUrl = url
      this.fetchUrl()
    }
  }
}
</script>

<style lang="less">
#home-info {
  width: 100%;
}

.diagonal {
  &.desktop {
    // Header height - padding and extra
    height: calc(100vh - 60px);
  }

  &.mobile {
    // Header height - padding and extra
    height: calc(100vh - 50px);
  }
}

.info-box {
  display: block;
  margin-left: auto;
  margin-right: auto;

  &.desktop {
    // Header height - padding and extra
    max-width: 600px;
  }

  &-title {
    .info-box-main & {
      background-color: #aedcff;
      border: 2px solid #0091ff;
      border-radius: 10px;
      transform: rotate(-5deg)
    }
  }
}

.info-about-button {
  text-align: center;
}
</style>
