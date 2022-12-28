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
  return { 
    isAddModalOpen,
    isEditModalOpen,
    setIsAddModalOpen,
    setIsEditModalOpen
  }
})
