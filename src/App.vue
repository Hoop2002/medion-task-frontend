
<template>
  <div id="app">
    <CompNavbar /> 
    <router-view /> 
  </div>
</template>

<script>
import CompNavbar from './components/CompNavbar.vue'; 

export default {
  components: {
    CompNavbar, 
  },
};
</script>
