import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const listFilename = ref(null);
  const list = ref(null);
  const blockOrder = ref(null);
  const practiceList = ref(null);
  const index = ref(0);
  const pid = ref(null);

  return { listFilename, list, blockOrder, practiceList, index, pid }
}, {
  persist: true
})
