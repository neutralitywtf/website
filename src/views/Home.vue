<template>
  <div class="home">
    <iframe v-if="ready" :src="fromAPI" width="100%"></iframe>
    {{fromAPI}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      ready: false,
      replacedUrl: '',
      fromAPI: ''
    }
  },
  components: {
  },
  async created () {
    this.ready = false
    const requestedUrl = encodeURIComponent('https://en.wikipedia.org/wiki/Ada_Lovelace')
    await fetch(`/.netlify/functions/replace/${requestedUrl}/desktop`)
    // this.fromAPI = (await resp.json())
    this.fromAPI = `/.netlify/functions/replace/${requestedUrl}/desktop`
    this.ready = true
  }
}
</script>
