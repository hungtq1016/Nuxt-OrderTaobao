<template>
  <div class="flex justify-center">
    <UForm :state="dataClaim" :validate="validate" @submit="submit"
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full max-w-2xl">
      <div class="px-4 py-6 sm:p-8">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Add Claim</h2>
        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div class="sm:col-span-4">
            <UFormGroup name="claimType">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Type</span>
                </template>
                <UInput v-model="dataClaim.claimType" 
                placeholder="Permission"/>
            </UFormGroup>
          </div>

          <div class="sm:col-span-4">
            <UFormGroup name="claimValue" class="mt-2">
                <template #label>
                    <span class="text-sm font-semibold leading-6 text-gray-900">Value</span>
                </template>
                <UInput v-model="dataClaim.claimValue" 
                placeholder="Controller.Edit"/>
            </UFormGroup>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button @click="back" type="button" class="text-sm font-semibold leading-6 text-gray-900">Back</button>
        <UButton type="submit" color="black">
          Submit
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ClaimRequest } from '~/type';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { dataClaim,validate } from '~/logic/pages/admin/roles';
import { update,post } from '~/logic/pages/RESTapi';

const { back } = useRouter();
const props = defineProps(['role', 'edit']);
const route = useRoute();
dataClaim.value.roleId = String(route.params.slug)
async function submit(event: FormSubmitEvent<ClaimRequest>) {
  if (props.edit) {
    update('roles',event.data.id,event.data)
  }else{
    post('roles/'+String(route.params.slug),event.data)
  }
}
</script>
