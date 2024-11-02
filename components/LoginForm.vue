<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  userEmail: z.string({message: 'Email harus diisi.'}).email({message: 'Email tidak valid.'}),
  userPassword: z.string({message: 'Kata Sandi harus diisi.'}).trim().min(8, {message: 'Kata Sandi minimal 8 karakter.'}),
})

type Schema = z.output<typeof schema>

const state = reactive({
  userEmail: undefined,
  userPassword: undefined
})
const authErrMsg = ref<string>()
const errors = ref()
const btnDisabled = ref<boolean>(false)
async function onSubmit (event: FormSubmitEvent<Schema>) {
  btnDisabled.value = true
  authErrMsg.value = ''
  const {data, status, error} = await useFetch('/api/auth/login', {
    method: 'post',
    body: event.data
  })
  console.log(status.value, data.value, error.value?.data)
  //const { errors, success} = data.value
  if (status.value === "success"){

  } else if (status.value === "error"){
    if (error.value?.data){
      if (error.value.data.errors){
        errors.value = error.value.data.errors
      } else if (error.value.data.message){
        authErrMsg.value = error.value.data.message
      }
    } else {
      authErrMsg.value = 'Tidak dapat login. Sila ulangi beberapa saat lagi.'
    }
  }
  btnDisabled.value = false
}
</script>
<template>
  <UCard>
    <template #header>
      <h1 class="text-xl font-semibold">Masuk</h1>
    </template>
    <UAlert v-if="authErrMsg" :description="authErrMsg" icon="i-heroicons-exclamation-triangle-16-solid" class="mb-3" color="red"></UAlert>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="userEmail">
        <UInput v-model="state.userEmail" />
      </UFormGroup>

      <UFormGroup label="Kata Sandi" name="userPassword">
        <UInput v-model="state.userPassword" type="password" />
      </UFormGroup>

      <div class="flex justify-between items-center">
        <UButton type="submit" size="md" class="font-bold" icon="i-heroicons-arrow-right-end-on-rectangle-20-solid" :loading="btnDisabled">Masuk</UButton>
        <UButton type="button" size="md" to="/" variant="soft" color="primary">Lupa Sandi</UButton>
      </div>
    </UForm>
  </UCard>
</template>
