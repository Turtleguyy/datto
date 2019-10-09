import { helper } from '@ember/component/helper'

export function numberShortener(number) {
  number = parseInt(number, 10)
  if (isNaN(number)) return

  if (number > 1000000) {
    return `${number / 1000000}M`
  } else if (number > 1000) {
    return `${number / 1000}K`
  } else {
    return `${number}`
  }
}

export default helper(numberShortener)
