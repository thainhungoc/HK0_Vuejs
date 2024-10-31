<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useField, useForm } from 'vee-validate'

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

// khởi tạo 
const users = ref<User[]>([])

//dữ liệu ban đầu
onMounted(() => {
  const storedUsers = localStorage.getItem('users')
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  }
})


const dialog = ref(false)
const deleteDialog = ref(false)
const isEditMode = ref(false)
const editUserId = ref<number | null>(null)
const userToDelete = ref<number | null>(null)

const dialogTitle = computed(() => isEditMode.value ? 'Edit User' : 'Add New User')

// Update localStorage 
const updateLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users.value))
}

const { handleSubmit, handleReset, setFieldValues } = useForm({
  validationSchema: {
    name(value: string | undefined): boolean | string {
      if (!value?.trim()) return 'Tên không được để trống'
      if (value?.length >= 3) return true
      return 'Tên phải nhiều hơn 3 ký tự'
    },
    email(value: string | undefined): boolean | string {
      if (!value?.trim()) return 'Email không được để trống'
      if (!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value || '')) {
        return 'Email không hợp lệ'
      }
      // Check email trùng
      const existingUser = users.value.find(
        user => user.email === value && user.id !== editUserId.value
      )
      if (existingUser) return 'Email đã tồn tại'
      return true
    },
    gender(value: string | undefined): boolean | string {
      if (value) return true
      return 'Vui lòng chọn giới tính'
    },
    dateOfBirth(value: string | undefined): boolean | string {
      if (value) return true
      return 'Vui lòng chọn ngày sinh'
    }
  },
})

const name = useField<string>('name')
const email = useField<string>('email')
const gender = useField<string>('gender')
const dateOfBirth = useField<string>('dateOfBirth')

const genderOptions = ref(['Male', 'Female', 'Other'])

// edit button
const handleEdit = (user: User) => {
  isEditMode.value = true
  editUserId.value = user.id
  dialog.value = true
  
  setFieldValues({
    name: user.name,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth
  })
}

// delete button
const handleDelete = (userId: number) => {
  userToDelete.value = userId
  deleteDialog.value = true
}

// Confirm delete
const confirmDelete = () => {
  if (userToDelete.value !== null) {
    users.value = users.value.filter(user => user.id !== userToDelete.value)
    updateLocalStorage()
  }
  closeDeleteDialog()
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  userToDelete.value = null
}

// tạo ID user mới
const generateNewId = (): number => {
  if (users.value.length === 0) return 1
  return Math.max(...users.value.map(user => user.id)) + 1
}

// submit form
const submit = handleSubmit((values: {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}) => {
  if (isEditMode.value && editUserId.value) {
    // Update user
    users.value = users.value.map(user => 
      user.id === editUserId.value 
        ? { ...user, ...values }
        : user
    )
  } else {
    // Add new user
    const newUser = {
      id: generateNewId(),
      ...values
    }
    users.value.push(newUser)
  }
  
  updateLocalStorage()
  closeDialog()
})

const closeDialog = () => {
  dialog.value = false
  isEditMode.value = false
  editUserId.value = null
  handleReset()
}
</script>

<template>
  <div class="dashboard">
    <!-- Main Content -->
    <div class="p-6">
      <!-- Header -->
      <div class="header-container">
        <h1 class="header-title">Manager User</h1>
        <button class="add-button" @click="dialog=true">Add New User</button>
      </div>

      <!-- Edit/Add Dialog Form -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">
            {{ dialogTitle }}
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                label="Name"
                required
              ></v-text-field>

              <v-select
                v-model="gender.value.value"
                :items="genderOptions"
                :error-messages="gender.errorMessage.value"
                label="Gender"
                required
              ></v-select>

              <v-text-field
                v-model="dateOfBirth.value.value"
                :error-messages="dateOfBirth.errorMessage.value"
                label="Date of Birth"
                type="date"
                required
              ></v-text-field>

              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="E-mail"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="closeDialog">Hủy</v-btn>
            <v-btn color="primary" @click="submit">
              {{ isEditMode ? 'Save' : 'Submit' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete Confirm -->
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card>
          <v-card-title class="text-h5">
            Xác nhận xóa
          </v-card-title>

          <v-card-text>
            Bạn có mún xóa người dùng này khong?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="closeDeleteDialog">Hủy</v-btn>
            <v-btn color="error" @click="confirmDelete">Xóa</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Table -->
      <div class="table-container">
        <table class="table-main">
          <thead class="table-header">
            <tr>
              <th class="table-th">ID</th>
              <th class="table-th">Name</th>
              <th class="table-th">Gender</th>
              <th class="table-th">Date Of Birth</th>
              <th class="table-th">Email</th>
              <th class="table-th">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="table-row">
              <td class="table-td">{{ user.id }}</td>
              <td class="table-td">{{ user.name }}</td>
              <td class="table-td">{{ user.gender }}</td>
              <td class="table-td">{{ user.dateOfBirth }}</td>
              <td class="table-td">{{ user.email }}</td>
              <td class="table-td">
                <div class="action-buttons">
                  <button class="edit-button" @click="handleEdit(user)">Edit</button>
                  <button class="delete-button" @click="handleDelete(user.id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped="scss">
/* Base styles */

/* Navigation styles */
.nav-container {
    background-color: #000000;
    color: #ffffff;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

.nav-link {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    
    &:hover {
        background-color: #1f2937;
    }
}

.nav-link-active {
    padding: 0.5rem 1rem;
    background-color: #1f2937;
    border-radius: 0.25rem;
}

/* Header styles */
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.header-title {
    font-size: 3rem;
    font-weight: 600;
    margin-left: 25px;
}

.add-button {
    background-color: #3b82f6;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #2563eb;
    }
}

/* Table styles */
.table-container {
    overflow-x: auto;
}

.table-main {
    min-width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
}

.table-header {
    background-color: #f9fafb;
}

.table-th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #e5e7eb;
}

.table-row {
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.15s;
    
    &:hover {
        background-color: #f9fafb;
    }
}

.table-td {
    padding: 0.75rem 1rem;
}

/* Action buttons */
.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.edit-button {
    background-color: #f97316;
    color: #ffffff;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #ea580c;
    }
}

.delete-button {
    background-color: #ef4444;
    color: #ffffff;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #dc2626;
    }
}
</style>