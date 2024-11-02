<template>
  <div class="flex flex-col justify-center h-screen y-auto">
    <div v-if="loading" class="text-center">Loading...</div>
    <CreateRootUserForm v-else-if="!hasRootUser" />
    <LoginForm v-else/>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import LoginForm from '../../components/LoginForm.vue'
import CreateRootUserForm from '../../components/CreateRootUserForm.vue'

definePageMeta({
  layout: 'admin'
})

const loading = ref<boolean>(true)
const hasRootUser = ref<boolean>()

if (import.meta.client){
  onMounted(async () => {
  //  console.log('onMounted')
    const { data, status, refresh } = await useFetch('/api/auth/has-root', {
      method: 'POST',
      server: false
    })

    if (status.value === "idle"){
      await refresh()
    }

    hasRootUser.value = data.value?.hasRootUser

    loading.value = false
  })
}

useSeoMeta({
  title: computed(() => hasRootUser.value ? "Login Admin":"Buat Akun Admin")
})
</script>