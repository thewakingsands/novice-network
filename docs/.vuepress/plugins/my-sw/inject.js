export default () => {
  if (
    (process.env.NODE_ENV === 'production' || localStorage.debugSw === '1') &&
    typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator
  ) {
    navigator.serviceWorker.register('/sw.js').then(function(register) {
      console.log('registered service worker')
    })
  }
}
