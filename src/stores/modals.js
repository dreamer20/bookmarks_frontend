import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModals = defineStore('modals', () => {
  const isAddModalOpen = ref(false)
  const isEditModalOpen = ref(false)

  function setIsAddModalOpen(value) {
    isAddModalOpen.value = value
  }

  function setIsEditModalOpen(value) {
    isEditModalOpen.value = value
  }

  function reset() {
    isAddModalOpen.value = false
    isEditModalOpen.value = false
  }

  return { 
    isAddModalOpen,
    isEditModalOpen,
    setIsAddModalOpen,
    setIsEditModalOpen,
    reset
  }
})
