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
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Share this replacement!
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
          <twitter-button
            :shareUrl="sharedUrl"
            :shareDescription="sharedDescription"
          />
          <facebook-button
            :shareUrl="sharedUrl"
            :shareDescription="sharedDescription"
          />
        </v-card-actions>
        <v-card-actions>
          <whatsApp-button
            :shareUrl="sharedUrl"
            :shareDescription="sharedDescription"
          />
          <telegram-button
            :shareUrl="sharedUrl"
            :shareDescription="sharedDescription"
          />
        </v-card-actions>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="copyToClipboardButton"
            color="primary"
            text
            @click="copyToClipboard"
          >
            Copy
            to clipboard
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton'
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton'
import WhatsAppButton from 'vue-share-buttons/src/components/WhatsAppButton'
import TelegramButton from 'vue-share-buttons/src/components/TelegramButton'

export default {
  name: 'ShareDialog',
  components: { TwitterButton, FacebookButton, WhatsAppButton, TelegramButton },
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
