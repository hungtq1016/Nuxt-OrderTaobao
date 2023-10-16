<template>
  <div>
    <NuxtLayout >
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
const {permission} = useUserInfo()
permission()

</script>