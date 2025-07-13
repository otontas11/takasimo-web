export default defineNuxtPlugin(() => {
  // Client-only plugin for Pinia hydration
  if (process.client) {
    // Wait for hydration to complete
    onMounted(() => {
      console.log('Pinia hydration plugin initialized')
      
      // Ensure stores are properly hydrated
      const { $pinia } = useNuxtApp()
      
      // Force rehydration if needed
      if ($pinia) {
        // Any additional hydration logic can go here
        console.log('Pinia instance available:', !!$pinia)
      }
    })
  }
}) 