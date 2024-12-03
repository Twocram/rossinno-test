<template>
  <Dialog
    header="Создать пользователя"
    :modal="true"
    visible
    :closable="true"
    @update:visible="hideHandler"
    :dismissableMask="true"
    style="width: 30rem"
  >
    <template #closeicon>
      <i class="pi pi-times" @click="closeDialog"></i>
    </template>
    <div class="field mb-4">
      <label for="username" class="block text-900 font-medium mb-2">Имя пользователя</label>
      <InputText
        id="username"
        v-model="form.login"
        placeholder="Введите имя пользователя"
        class="w-full"
      />
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
        placeholder="Введите email"
        class="w-full"
      />
    </div>

    <div class="field mb-4">
      <label for="lastname" class="block text-900 font-medium mb-2">Фамилия</label>
      <InputText id="lastname" v-model="form.lastName" placeholder="Введите email" class="w-full" />
    </div>

    <div class="field mb-4">
      <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
      <Password
        id="password"
        v-model="form.password"
        :toggleMask="true"
        inputClass="w-full"
        :feedback="false"
        placeholder="Введите пароль"
        type="password"
        class="w-full"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button label="Отмена" class="p-button-text" @click="closeDialog" />
      <Button label="Сохранить" class="p-button-primary" :loading="isLoading" @click="saveUser" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { reactive, ref } from 'vue'

const form = reactive({
  login: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
})

const hideHandler = (value: boolean) => {
  if (!value) {
    emits('closeDialog')
  }
}

const isLoading = ref(false)

const emits = defineEmits(['closeDialog', 'saveUser'])

const closeDialog = () => {
  emits('closeDialog')
}

const saveUser = () => {
  isLoading.value = true
  emits('saveUser', form)
}
</script>

<style scoped></style>
