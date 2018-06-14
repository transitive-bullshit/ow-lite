import { func } from '../symbols'

const predicates = {
  empty: (value) => (value.length === 0),
  nonEmpty: (value) => (value.length > 0),

  [func]: {
    is: (fn) => fn,
    length: (v) => (value) => (value.length === v),
    minLength: (v) => (value) => (value.length >= v),
    maxLength: (v) => (value) => (value.length <= v)
  }
}

export default {
  predicates,
  validator: (value) => Array.isArray(value)
}
