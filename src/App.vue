<template>
  <div>
    <Header/>
    <main class="container-lg pt-5">
      <div class="m-3 alert alert-danger" v-if="error">
        {{error}}
      </div>
      <router-view/>
    </main>
    <uxa-loader v-if="showLoader" />
  </div>
</template>

<script>
import Header from './components/Header';
import UxaLoader from './components/UxaLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    UxaLoader
  },
  computed: mapGetters(['error', 'showLoader'])
}


</script>

<style lang="scss">


</style>
