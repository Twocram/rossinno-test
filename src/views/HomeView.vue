<template>
  <VHeader />
  <VUserDialog
    v-if="displayUserDialog"
    @save-user="saveUserHandler($event)"
    @close-dialog="displayUserDialog = false"
  />
  <Button
    label="Создать пользователя"
    icon="pi pi-user-plus"
    class="mb-3"
    @click="displayUserDialog = true"
  />
  <DataTable :value="users">
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
    <Column header="Действия">
      <template #body="{ data }">
        <Button
          v-if="userLogin !== data.login"
          class="p-button-danger"
          @click="deleteUserHandler(data.login)"
        >
          Удалить
        </Button>
      </template>
    </Column>
  </DataTable>

  <Paginator
    @page="handlePageChange($event.page)"
    :totalPages="totalPages"
    :totalRecords="usersCount"
    :rows="rows"
  />
</template>

<script setup lang="ts">
import { register } from '@/api/auth'
import { deleteUser, getUsers } from '@/api/users'
import VUserDialog from '@/components/dialogs/VUserDialog.vue'
import VHeader from '@/components/VHeader.vue'
import { useUserStore } from '@/stores/user'
import type { RegisterBody } from '@/types/auth'
import type { User } from '@/types/user'
import { Button, Column, DataTable, Paginator } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const userStore = useUserStore()

const userLogin = computed(() => {
  return userStore.user?.login
})

const usersCount = ref(0)

const USERS_LIMIT = ref(10)
const USERS_OFFSET = ref(0)

const users = ref<User[]>([])

const totalPages = computed(() => {
  return Math.ceil(usersCount.value / USERS_LIMIT.value)
})

const rows = ref(10)

const displayUserDialog = ref(false)

const columns: { field: string; header: string }[] = [
  {
    field: 'login',
    header: 'Логин',
  },
  {
    field: 'firstName',
    header: 'Имя',
  },
  {
    field: 'lastName',
    header: 'Фамилия',
  },
  {
    field: 'email',
    header: 'Email',
  },
  {
    field: 'role',
    header: 'Роль',
  },
]

const fetchUsers = async () => {
  const response = await getUsers({
    options: { limit: USERS_LIMIT.value, offset: USERS_OFFSET.value },
  })

  if (response) {
    if (response.status === 200) {
      const { items, count } = response.data
      users.value = items
      usersCount.value = count
    }
  }
}

const deleteUserHandler = async (login: string) => {
  await deleteUser(login)

  await fetchUsers()
}

const saveUserHandler = async (user: RegisterBody) => {
  await register(user)

  await fetchUsers()

  displayUserDialog.value = false
}

const handlePageChange = (page: number) => {
  USERS_OFFSET.value = page * USERS_LIMIT.value
  fetchUsers()
}

onMounted(async () => {
  await fetchUsers()
})
</script>
