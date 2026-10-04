export default () => {
  if (
    process.env.NODE_ENV === 'production' &&
    typeof location !== 'undefined'
  ) {
    try {
      if (
        location.hostname !== 'ff14.org' &&
        !location.hostname.match(/^(localhost|127\.0\.0\.1)$/)
      ) {
        location.hostname = 'ff14.org'
      }
    } catch {}
  }
}
