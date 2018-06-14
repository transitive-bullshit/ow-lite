'use strict'

const { func } = require('../symbols')
const { getObjectType } = require('../utils')

const predicates = {
  [func]: {
    is: (fn) => fn,
    before: (v) => (value) => (value.getTime() < v.getTime()),
    after: (v) => (value) => (value.getTime() > v.getTime())
  }
}

module.exports = {
  predicates,
  validator: (value) => (getObjectType(value) === 'Date')
}
