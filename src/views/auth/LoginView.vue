<template>
  <div class="flex justify-content-center align-items-center min-h-screen surface-ground">
    <div class="surface-card p-4 w-full sm:w-30rem">
      <h2 class="text-center text-900 mb-5">Авторизация</h2>
      <div class="field mb-4">
        <label for="username" class="block text-900 font-medium mb-2">Логин</label>
        <InputText id="username" v-model="form.login" placeholder="Введите логин" class="w-full" />
      </div>
      <div class="field mb-4">
        <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
        <Password
          class="w-full"
          inputClass="w-full"
          id="password"
          v-model="form.password"
          :feedback="false"
          promptLabel="Введите пароль"
          weakLabel="Слабый пароль"
          mediumLabel="Средний пароль"
          strongLabel="Сильный пароль"
          placeholder="Введите пароль"
          toggleMask
        />
      </div>
      <div class="danger mb-3" v-if="isSomethingWentWrong">Что-то пошло не так</div>

      <Button
        label="Войти"
        :loading="isResponseSending"
        class="w-full mb-3"
        @click="handleLogin"
        :disabled="!form.login || !form.password"
      />
      <Button label="Регистрация" class="w-full p-button-text" @click="goToRegistration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth'
import { useAuth } from '@/composables/useAuth'
import { REFRESH_TOKEN_STORE_NAME } from '@/utils/const'
import { getPassword } from '@/utils/hasher'
import Password from 'primevue/password'

const router = useRouter()

const isFormValid = computed(() => form.login && form.password)
const { checkUserHandler } = useAuth()

const isResponseSending = ref(false)
const isSomethingWentWrong = ref(false)

const form = reactive({
  login: '',
  password: '',
})

const handleLogin = async () => {
  if (!isFormValid.value) {
    return
  }

  isResponseSending.value = true

  const response = await login({
    login: form.login,
    password: getPassword(form.login, form.password),
    sessionId: '-',
  })

  if (response) {
    if (response.status === 200) {
      localStorage.setItem(REFRESH_TOKEN_STORE_NAME, response.refreshToken)
      await checkUserHandler()
      await router.push('/')
    }

    if (response.status === 400) {
      isSomethingWentWrong.value = true
    }
  }

  isResponseSending.value = false
}

watch(
  form,
  () => {
    isSomethingWentWrong.value = false
  },
  {
    deep: true,
  },
)

const goToRegistration = async () => {
  await router.push('/auth/register')
}
</script>
