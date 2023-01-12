import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalError = defineStore('globalError', () => {
  const message = ref(null)
  
  function setMessage(value) {
    message.value = value
  }

  function removeMessage() {
    message.value = null
  }

  function reset() {
    message.value = null
  }

  return { message, setMessage, removeMessage, reset }
})
