
<template>
    <AppHeader/>
    <div>
      <div>Hello form default</div>
      <slot />
    </div>
  </template>
  <script lang="ts"   setup>
import AppHeader from '~/components/include/header/AppHeader.vue';

</script>