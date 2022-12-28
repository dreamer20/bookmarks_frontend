<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { useGlobalError } from './stores/globalError.js'
  import { useAuth } from './stores/auth';
  import { useModals } from './stores/modals';

  const isCloseableAlertVisible = ref(false)
  const auth = useAuth()
  const globalError = useGlobalError()
  const modals = useModals()
  const router = useRouter()

  onBeforeMount(() => {
    if (!auth.isAuthenticated) {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/login')
      } else {
        auth.setToken(token)
        auth.setIsAuthenticated(true)
      }
    }
  })

  function logout() {
    localStorage.removeItem('token')
    auth.removeToken()
    auth.setIsAuthenticated(false)
    router.push('/login')
  }
</script>

<template>
  <va-alert
  closeable
  color="danger"
  class="ml-2 mr-2"
  dense
  v-model="globalError.message">
  {{ globalError.message }}
  </va-alert>
  <div class="container">
    <div class="navbar-wrapper">
      <va-navbar class="navbar">
              <template #left v-if="auth.isAuthenticated">
                <va-navbar-item>
                  <va-button preset="primary" @click="modals.setIsAddModalOpen(true)"> Add bookmark </va-button>
                </va-navbar-item>
              </template>
              <template #right v-if="auth.isAuthenticated">
                <va-navbar-item><a href="#" class="va-link" @click.prevent="logout">Logout</a></va-navbar-item>
              </template>
              <template #right v-else>
                <va-navbar-item><router-link to="/login" class="va-link">Login</router-link></va-navbar-item>
                <va-navbar-item><router-link to="/register" class="va-link">Register</router-link></va-navbar-item>
              </template> 
      </va-navbar>
    </div>
    <div class="row centered">
      <div class="flex md12 sm12 xs12">
        <div class="item centered ">
          <RouterView />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  background: #fff;
}

.navbar-wrapper {
  max-width: 1444px;
  margin: 0 auto 40px auto;
}

.navbar {
  flex-direction: row;
}

.centered {
    display: flex;
    justify-content: center;
  }
</style>
