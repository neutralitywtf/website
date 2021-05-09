<template>
  <v-container class="dictionary pa-0 diagonal" fluid fill-height>
    <v-row no-gutters align="center" justify="center">
      <v-col class="col-md-6 col-sm-12">
        <section class="pa-10 about-text">
          <h1>Dictionary term replacements</h1>
          <p>Neutrality.WTF performs 1:1 replacements based on a given dictionary. As indicated in the <a to="/about">about page</a>, this replacement style is extremely limited and flawed - but serves the general purpose of getting an idea of what a "flipped" language looks like in a general sense.</p>
          <p>The dictionary is defined in the open source repository and is actively maintained.</p>
          <p>Below are all the terms the system uses as replacements between gendered "men" and gendered "women" terms.</p>
          <DictionaryTable />
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DictionaryTable from '../components/DictionaryTable'
export default {
  name: 'Dictionary',
  components: { DictionaryTable }
}
</script>
