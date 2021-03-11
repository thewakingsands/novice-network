/* globals clients */
self.addEventListener('activate', event => {
  clients.claim()
  console.log('claim activate')
})

self.addEventListener('fetch', function(event) {
  if (typeof URL === 'undefined') {
    return
  }

  var request = event.request.clone()
  var url = new URL(request.url)
  var cdnUrl = new URL('https://ff14-org.xivcdn.com')

  if (url.origin !== self.origin && url.origin !== cdnUrl.origin) {
    return
  }
  if (url.pathname === '/sw.js') {
    return
  }

  try {
    url.host = cdnUrl.host
    url.protocol = cdnUrl.protocol
    url.port = cdnUrl.port || 443

    var newReq = new Request(url, {
      ...request,
      mode: 'cors'
    })

    event.respondWith(
      fetch(newReq).then(function (res) {
        if (res.redirected) {
          // redirected response cannot used for a request whose redirect mode is not follow
          return fetch(request)
        }

        return res
      }).catch(function(e) {
        console.error('sw error', e)
        return fetch(request)
      })
    )
  } catch (e) {
    console.error('sw error', e)
    event.respondWith(fetch(request))
  }
})

console.log('sw load')
