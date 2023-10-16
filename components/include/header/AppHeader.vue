
<template>
  <div class="bg-white">
    <TheNavigationAdmin />
    <TheNavigationClient />
  </div>
</template>
  
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TheNavigationAdmin from './Admin/TheNavigation.vue';
import TheNavigationClient from './Client/TheNavigation.vue';


</script>