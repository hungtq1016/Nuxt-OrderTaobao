<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const layout = computed(()=>{
  if(route.path.split("/")[1] != "auth")
    return "default";
 return "auth"
});
 
</script>
