'use strict'

import { func } from '../symbols'
import { getObjectType } from '../utils'

const predicates = {
  [func]: {
    is: (fn) => fn,
    before: (v) => (value) => (value.getTime() < v.getTime()),
    after: (v) => (value) => (value.getTime() > v.getTime())
  }
}

export default {
  predicates,
  validator: (value) => (getObjectType(value) === 'Date')
}
