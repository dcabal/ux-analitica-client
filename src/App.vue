<template>
  <div>
    <Header/>
    <main class="container-lg pt-5">
      <div class="m-3 alert alert-danger" v-if="error">
        {{error}}
      </div>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from './components/Header';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Header
  },
  computed: mapGetters(['error'])
}


</script>

<style lang="scss">


</style>
