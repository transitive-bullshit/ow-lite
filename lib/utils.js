'use strict'

exports.getObjectType = (value) => toString.call(value).slice(8, -1)
