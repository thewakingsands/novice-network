export function getIconUrl(id) {
  id = parseInt(id)
  let idStr = '' + id
  if (id < 10) {
    idStr = '00000' + id
  } else if (id < 100) {
    idStr = '0000' + id
  } else if (id < 1000) {
    idStr = '000' + id
  } else if (id < 10000) {
    idStr = '00' + id
  } else if (id < 100000) {
    idStr = '0' + id
  }
  let idGroup = idStr.substring(0, 3) + '000'

  return `https://cafemaker.wakingsands.com/i/${idGroup}/${idStr}.png`
}
