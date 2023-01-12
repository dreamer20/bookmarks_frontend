import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useBookmarks } from './bookmarks'
import { useGlobalError } from './globalError'
import { useModals } from './modals'

export const useAuth = defineStore('auth', () => {
  const token = ref(null)
  const isAuthenticated = ref(false)
  const isSessionExpired = ref(false)

  const bookmarks = useBookmarks()
  const globalError = useGlobalError()
  const modals = useModals()
  
  function setToken(value) {
    token.value = value
  }

  function removeToken() {
    token.value = null
  }

  function setIsAuthenticated(value) {
    isAuthenticated.value = value
  }

  function setIsSessionExpired(value) {
    isSessionExpired.value = value
  }

  function logout(sessionState) {
    localStorage.removeItem('token')
    token.value = null
    isAuthenticated.value = false
    isSessionExpired.value = sessionState
    modals.reset()
    globalError.reset()
    bookmarks.reset()
    this.router.push('/login')
  }

  return {
    token,
    isAuthenticated,
    isSessionExpired,
    setToken,
    removeToken,
    setIsAuthenticated,
    setIsSessionExpired,
    logout,
  }
})
