<template>
  <TheHero/>
  <TheCategory/>
  <TheFeature/>
</template>

<script setup lang="ts">
import TheHero from '~/components/client/top/TheHero.vue';
import TheCategory from '~/components/client/top/TheCategory.vue';
import TheFeature from '~/components/client/top/TheFeature.vue';

useHead({
  title: 'Trang Chủ | Order Taobao',
  meta: [
    { name: 'description', content: 'homepage' }
  ],
})
</script>
