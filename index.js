'use strict'

const symbols = require('./lib/symbols')

const array = require('./lib/predicates/array')
const boolean = require('./lib/predicates/boolean')
const date = require('./lib/predicates/date')
const func = require('./lib/predicates/function')
const number = require('./lib/predicates/number')
const object = require('./lib/predicates/object')
const string = require('./lib/predicates/string')

const typePredicates = {
  array,
  boolean,
  date,
  function: func,
  number,
  object,
  string
}

const createOw = ({
  validators = [],
  predicates = typePredicates,
  type = null
} = { }) => {
  const ow = new Proxy(function () { }, {
    get: (obj, key) => {
      if (key === symbols.validate) {
        return (value, label = 'argument') => {
          if (!type) {
            return new Error('missing required type specifier')
          }

          for (let i = 0; i < validators.length; ++i) {
            const validator = validators[i]
            const result = validator.fn(value)

            if (!result) {
              if (i === 0) {
                throw new Error(`Expected ${label} \`${value}\` to be of type \`${type}\`, but received type \`${typeof value}\``)
              } else {
                throw new Error(`Expected ${type} \`${label}\` \`${value}\` failed predicate \`${validator.key}\``)
              }
            }
          }
        }
      }

      if (!predicates) {
        throw new Error(`Unknown \`${type}\` predicate \`${key}\``)
      }

      const predicate = predicates[key]

      if (predicate) {
        if (typeof predicate === 'function') {
          validators.push({
            key,
            fn: predicate
          })

          return ow
        } else {
          return createOw({
            type: key,
            validators: [
              {
                key,
                fn: predicate.validator
              }
            ],
            predicates: predicate.predicates || null
          })
        }
      } else {
        const fn = predicates[symbols.func] && predicates[symbols.func][key]

        if (fn) {
          return new Proxy(function () { }, {
            get: () => {
              throw new Error(`invalid use of functional predicate "${key}"`)
            },

            apply: (obj, thisArg, args) => {
              validators.push({
                key,
                fn: fn(...args)
              })

              return ow
            }
          })
        } else {
          if (key === 'default' || key === '__esModule') {
            return ow
          }

          return ow
          // throw new Error(`unrecognized predicate "${key}"`)
        }
      }
    },

    apply: (obj, thisArg, args) => {
      if (args.length !== 2 && args.length !== 3) {
        throw new Error('invalid number of arguments to "ow"')
      } else {
        args[1][symbols.validate](args[0], args[2])
      }
    }
  })

  return ow
}

module.exports = createOw()
