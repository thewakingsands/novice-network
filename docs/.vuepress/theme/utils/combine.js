// TODO: 按参数进行缓存
export function createDebounce(worker, timeout, maxBatchSize = 20) {
  let timer = null
  let cachedArgList = []
  let cachedPromises = []

  const doWork = async function() {
    const myArgList = cachedArgList.slice(0)
    const myPromises = cachedPromises.slice(0)

    cachedArgList = []
    cachedPromises = []

    try {
      const results = await worker(myArgList)
      for (let i = 0; i < results.length; i++) {
        const result = results[i]
        myPromises[i][0](result)
      }
    } catch (e) {
      for (let i = 0; i < myPromises.length; i++) {
        myPromises[i][1](e)
      }
    }
  }

  return function(...args) {
    const promise = new Promise(function(resolve, reject) {
      cachedArgList.push(args)
      cachedPromises.push([resolve, reject])
    })

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
