# ow-lite

> Lightweight replacement for the [ow](https://github.com/sindresorhus/ow) validation library meant for browser usage.

[![NPM](https://img.shields.io/npm/v/ow-lite.svg)](https://www.npmjs.com/package/ow-lite) [![Build Status](https://travis-ci.com/transitive-bullshit/ow-lite.svg?branch=master)](https://travis-ci.com/transitive-bullshit/ow-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ow-lite
```

## Why

`ow-lite` supports 98% of practical `ow` usage that I've seen, but is **30x smaller**, which is really important for **browser usage**.

`ow@0.5.0` weighs in at 119.61kb (65.95kb minified, 17.58kb gzipped)
`ow-lite` weighs in at 6kb (2.2kb minified, 903b gzipped)

`ow-lite` has the following drawbacks:

- less verbose error messages
- less support for uncommon types and predicate methods

## Usage

You may use `ow-lite` as a drop-in replacement for `ow`.

`ow-lite` supports the following predicate types:

- number
- string
- object

Webpack's [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) is a solid option for replacing `ow` with `ow-lite` at build time. See also [ow-shim](https://github.com/transitive-bullshit/ow-shim) if you want to replace `ow` usage with noops in production.

## Related

- [ow](https://github.com/sindresorhus/ow) - Function argument validation for humans.
- [ow-shim](https://github.com/transitive-bullshit/ow-shim) - Drop-in replacement to make the ow validation library a noop in production.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)