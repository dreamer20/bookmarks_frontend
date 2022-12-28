<script setup>
  import { ref } from 'vue'
  import { api } from '../api.js'
  import { useRouter } from 'vue-router';
  import { useGlobalError } from '../stores/globalError.js';
  import { useAuth } from '../stores/auth.js';

  const username = ref('')
  const password = ref('')
  const isFetching = ref(false)
  const errorMessage = ref(null)
  const isPasswordVisible = ref(false)
  const globalError = useGlobalError()
  const auth = useAuth()
  const router = useRouter()

  async function login() {
    errorMessage.value = null

    try {
      isFetching.value = true
      const response = await api.getToken(username.value, password.value)

      if (!response.ok) {
        const data = await response.json()
        errorMessage.value = data.detail
      } else {
        const data = await response.json()
        const token = data.access_token

        auth.setToken(token)
        auth.setIsAuthenticated(true)
        localStorage.setItem('token', token)

        router.push('/')
      }
      
    } catch (err) {
      globalError.setMessage(err)
    } finally {
      isFetching.value = false
    }
  }
</script>

<template>
  <div class="form-wrapper">
    <va-card>
      <va-card-title>Login</va-card-title>
      <va-card-content>
        <va-form class="login-form">
          <va-input
            class="mb-4 form-control"
            label="Username"
            v-model="username"/>
          <va-input
            class="mb-4 form-control"
            label="Password"
            v-model="password"
            :type="isPasswordVisible ? 'text': 'password'">
            <template #appendInner>
              <va-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              size="small"
              color="--va-primary"
              @click="isPasswordVisible = !isPasswordVisible" />
            </template>
          </va-input>
            <p style="color: #d7234e;">{{ errorMessage }}</p>
            <div class="submit-wrapper">
              <va-button :loading="isFetching" @click="login">Login</va-button>  
            </div>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 400px;
}

.form-control {
  width: 100%;
}

.submit-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>