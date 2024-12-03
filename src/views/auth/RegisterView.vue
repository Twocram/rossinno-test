<template>
  <div class="flex justify-content-center align-items-center min-h-screen surface-ground">
    <div class="surface-card p-4 w-full sm:w-30rem">
      <h2 class="text-center text-900 mb-5">Регистрация</h2>
      <div class="field mb-4">
        <label for="login" class="block text-900 font-medium mb-2">Логин</label>
        <InputText id="login" v-model="form.login" placeholder="Введите логин" class="w-full" />
      </div>
      <div class="field mb-4">
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email" v-model="form.email" placeholder="Введите email" class="w-full" />
      </div>
      <div class="field mb-4">
        <label for="firstname" class="block text-900 font-medium mb-2">Имя</label>
        <InputText
          id="firstname"
          v-model="form.firstName"
          placeholder="Введите имя"
          class="w-full"
        />
      </div>
      <div class="field mb-4">
        <label for="lastname" class="block text-900 font-medium mb-2">Фамилия</label>
        <InputText
          id="lastname"
          v-model="form.lastName"
          placeholder="Введите фамилию"
          class="w-full"
        />
      </div>
      <div class="field mb-4">
        <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
        <Password
          class="w-full"
          inputClass="w-full"
          id="password"
          v-model="form.password"
          promptLabel="Введите пароль"
          weakLabel="Слабый пароль"
          mediumLabel="Средний пароль"
          strongLabel="Сильный пароль"
          placeholder="Введите пароль"
          toggleMask
        />
      </div>
      <div class="field mb-4">
        <label for="confirm-password" class="block text-900 font-medium mb-2"
          >Подтвердите пароль</label
        >
        <Password
          class="w-full"
          inputClass="w-full"
          id="confirm-password"
          v-model="form.confirmPassword"
          :feedback="false"
          promptLabel="Введите пароль"
          weakLabel="Слабый пароль"
          mediumLabel="Средний пароль"
          strongLabel="Сильный пароль"
          placeholder="Введите пароль"
          toggleMask
        />
      </div>

      <div class="danger mb-3" v-if="!isFormValid && responseSended">
        Проверьте, что все поля заполнены
      </div>
      <div class="danger mb-3" v-if="!isPasswordMatch">Пароли не совпадают</div>
      <div class="danger mb-3" v-if="isSomethingWentWrong">Что-то пошло не так</div>
      <Button
        label="Зарегистрироваться"
        :loading="isResponseSending"
        class="w-full mb-3"
        @click="handleRegister"
        :disabled="!isFormValid"
      />
      <Button label="Авторизация" class="w-full p-button-text" @click="goToLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { register } from '@/api/auth'
import Password from 'primevue/password'
import { getPassword } from '../../utils/hasher'

const router = useRouter()

const form = reactive({
  login: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  email: '',
})

const isSomethingWentWrong = ref(false)

const responseSended = ref(false)
const isResponseSending = ref(false)

const isPasswordMatch = computed(() => form.password === form.confirmPassword)

const isFormValid = computed(() => {
  return (
    form.login &&
    form.password &&
    form.confirmPassword &&
    form.firstName &&
    form.lastName &&
    form.email &&
    isPasswordMatch.value
  )
})

const handleRegister = async () => {
  responseSended.value = true
  isResponseSending.value = true

  const response = await register({
    login: form.login,
    password: getPassword(form.login, form.password),
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
  })

  if (response) {
    if (response.status === 204) {
      await router.push('/auth/login')
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
    responseSended.value = false
  },
  {
    deep: true,
  },
)

const goToLogin = async () => {
  await router.push('/auth/login')
}
</script>
