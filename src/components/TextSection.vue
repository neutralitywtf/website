<template>
  <v-row
    align="center"
    class="mx-auto"
    justify="center"
  >
  <v-col class="col-12 col-md-6 col-lg-6 col-xl-6">
    <v-card
      elevation="2"
    >
      <v-card-title v-if="!!title">{{title}}</v-card-title>
      <v-card-subtitle v-if="!!subtitle">{{subtitle}}</v-card-subtitle>
      <v-card-text>
        <div class="text--primary">
          <slot></slot>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'TextSection',
  props: ['title', 'subtitle'],
  data () {
    return {
    }
  }
}
</script>
