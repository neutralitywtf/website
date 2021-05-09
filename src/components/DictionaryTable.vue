<template>
  <div class="neutralitywtf-dictionary">
    <v-data-table
      :headers="headers"
      :items="termList"
      item-key="name"
      class="elevation-1"
      :search="search"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import dictionaryData from '../data/binarygender.json'
export default {
  name: 'DictionaryTable',
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Category',
          align: 'start',
          value: 'category'
        },
        {
          text: 'Male terms',
          value: 'men'
        },
        {
          text: 'Female terms',
          value: 'women'
        }
      ],
      termList: [],
      itemsPerPage: 25
    }
  },
  created () {
    dictionaryData.terms.forEach(termData => {
      this.termList.push({
        category: termData.category,
        men: termData.terms.men.join(', '),
        women: termData.terms.women.join(', ')
      })
    })
  }
}
</script>
