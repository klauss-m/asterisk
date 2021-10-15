/* eslint-disable no-restricted-globals */

self.addEventListener('install', () => {
  console.log('sw installed')
  self.skipWaiting()
})

self.addEventListener('activated', () => {
  console.log('sw activated')
})

self.addEventListener('fetch', async (event) => {
  if (event.request.mode === 'navigate') {
    try {
      console.log(event.request)
      return await fetch(event.request)
    } catch (e) {
      return new Response(new Blob(), { status: 200, statusText: 'OFFLINE?' })
    }
  }
})
