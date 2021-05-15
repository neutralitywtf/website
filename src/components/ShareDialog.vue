<template>
  <div>
    <v-btn
      small
      color="info"
      class="mx-5"
      @click="shareDialog = true"
    >
      Share this!
    </v-btn>
    <v-dialog
      v-model="shareDialog"
      width="500"
    >
      <v-card-title class="headline grey lighten-2">
        Share this with the world!
      </v-card-title>
      <v-card-actions>
        <twitter-button
          :shareUrl="sharedUrl"
          :shareDescription="shareDescription"
        />
        <facebook-button
          :shareUrl="sharedUrl"
          :shareDescription="shareDescription"
        />
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton'
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton'

export default {
  name: 'ShareDialog',
  components: { TwitterButton, FacebookButton },
  data: () => ({
    shareDialog: false
  }),
  computed: {
    sharedDescription () {
      return 'Check out this article when all gender language is flipped.'
    },
    sharedUrl () {
      return window.location.href
    }
  }
}
</script>
