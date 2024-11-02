export default defineAppConfig({
  ui: {
    gray: 'slate',
    button: {
      default: {
        loadingIcon: 'i-hugeicons:loading-02'
      }
    },
    card: {
      shadow: '',
      background: 'bg-white dark:bg-gray-800',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
      header: {
        padding: 'px-4 py-3 sm:px-5'
      },
      body: {
        padding: 'px-4 py-3 sm:p-5'
      }
    }
  }
})
