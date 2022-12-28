import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const token = ref(null)
  const isAuthenticated = ref(false)

  function setToken(value) {
    token.value = value
  }

  function removeToken() {
    token.value = null
  }

  function setIsAuthenticated(value) {
    isAuthenticated.value = value
  }

  return {
    token,
    isAuthenticated,
    setToken,
    removeToken,
    setIsAuthenticated
  }
})
