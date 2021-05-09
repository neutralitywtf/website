<template>
  <div class="neutralitywtf-dictionary">
    <!-- <v-data-table
      :headers="headers"
      :items="termList"
      item-key="name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table> -->
  </div>
</template>

<script>
// import dictionaryData from '../data/binarygender.json'
export default {
  name: 'DictionaryTable',
  data () {
    return {
      search: ''
    }
  }
}
</script>
