import { useWhitelistStore } from '@/store/whitelist'
import { ref } from 'vue'

export const useWhitelistForm = () => {
  const whitelistStore = useWhitelistStore()
  const loading = ref(false)

  const address = ref('')
  const error = ref('')

  const add = async () => {
    try {
      loading.value = true
      await whitelistStore.add(address.value)
      reset()
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    address.value = ''
    error.value = ''
  }

  return { add, reset, error, address, loading }
}
