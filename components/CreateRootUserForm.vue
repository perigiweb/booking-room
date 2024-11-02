<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import { UserRole } from '@prisma/client'

const schema = z.object({
  userEmail: z.string({message: 'Email harus diisi.'}).email({message: 'Email tidak valid.'}),
  userPassword: z.string({message: 'Kata Sandi harus diisi.'}).trim().min(8, {message: 'Kata Sandi minimal 8 karakter.'}),
  userName: z.string({message: 'Nama harus diisi.'}).trim().min(2, {message: 'Nama minimal 2 karakter.'}),
  userRole: z.nativeEnum(UserRole),
  userPhone: z.union([z.string().regex(/^[0-9]+$/, {message: 'No. Telepon hanya berupa angka.'}).nullable(), z.literal("")]).optional()
})

type Schema = z.output<typeof schema>

const state = reactive({
  userEmail: undefined,
  userPassword: undefined,
  userName: undefined,
  userPhone: undefined,
  userRole: UserRole.ROOT
})
const authErrMsg = ref<string>()
const errors = ref()
const btnDisabled = ref<boolean>(false)
async function onSubmit (event: FormSubmitEvent<Schema>) {
  btnDisabled.value = true
  const {data, status, error} = await useFetch('/api/auth/create-root', {
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
      authErrMsg.value = 'Tidak dapat membuat user.'
    }
  }
  btnDisabled.value = false
}
</script>
<template>
  <UCard>
    <template #header>
      <h1 class="text-xl font-semibold">Buat Akun Admin</h1>
    </template>
    <UAlert v-if="authErrMsg" :description="authErrMsg" icon="i-heroicons-exclamation-triangle-16-solid" class="mb-3" color="red"></UAlert>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="userEmail">
        <UInput v-model="state.userEmail" />
      </UFormGroup>

      <UFormGroup label="Kata Sandi" name="userPassword">
        <UInput v-model="state.userPassword" type="password" />
      </UFormGroup>

      <UFormGroup label="Name" name="userName">
        <UInput v-model="state.userName" />
      </UFormGroup>

      <UFormGroup label="No. Telepon" name="userPhone">
        <UInput v-model="state.userPhone" />
      </UFormGroup>

      <div class="flex justify-between items-center">
        <UButton type="submit" size="md" class="font-bold" icon="i-hugeicons:add-square" :loading="btnDisabled">Buat Akun</UButton>
      </div>
    </UForm>
  </UCard>
</template>