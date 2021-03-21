<template>
  <div>
    <Header/>
    <main class="container-lg pt-5">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}


</script>

<style lang="scss">


</style>
