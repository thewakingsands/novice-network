export function createDebounce(worker, filter, timeout, maxBatchSize = 20) {
  let timer = null
  let cachedArgList = []
  let cachedPromises = []
  let memoryCache = []

  const removeMemoryCache = function(args) {
    const index = memoryCache.findIndex(x => argsEquals(args, x.args))
    if (index >= 0) {
      memoryCache.splice(index, 1)
    }
  }

  const doWork = async function() {
    const myArgList = cachedArgList.slice(0)
    const myPromises = cachedPromises.slice(0)

    cachedArgList = []
    cachedPromises = []

    try {
      const results = await worker(myArgList)
      for (let i = 0; i < myArgList.length; i++) {
        const result = filter(results, ...myArgList[i])
        if (!result) {
          removeMemoryCache(myArgList[i])
        }
        myPromises[i][0](result)
      }
    } catch (e) {
      for (let i = 0; i < myPromises.length; i++) {
        myPromises[i][1](e)
        removeMemoryCache(myArgList[i])
      }
    }
  }

  return function(...args) {
    const index = memoryCache.findIndex(x => argsEquals(args, x.args))
    if (index >= 0) {
      return memoryCache[index].promise
    }

    const promise = new Promise(function(resolve, reject) {
      cachedArgList.push(args)
      cachedPromises.push([resolve, reject])
    })
    memoryCache.push({ args, promise })

    if (timer) {
      clearTimeout(timer)
    }

    if (cachedArgList.length >= maxBatchSize) {
      doWork()
    } else {
      timer = setTimeout(doWork, timeout)
    }

    return promise
  }
}

function argsEquals(a, b) {
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
