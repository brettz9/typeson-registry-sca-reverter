# typeson-registry-sca-reverter

[![Build Status](https://img.shields.io/travis/axemclion/IndexedDBShim.svg)](https://travis-ci.org/axemclion/IndexedDBShim)
[![Dependencies](https://img.shields.io/david/axemclion/indexeddbshim.svg)](https://david-dm.org/axemclion/indexeddbshim)
[![devDependencies](https://img.shields.io/david/dev/axemclion/indexeddbshim.svg)](https://david-dm.org/axemclion/indexeddbshim?type=dev)
[![npm](http://img.shields.io/npm/v/indexeddbshim.svg)](https://www.npmjs.com/package/indexeddbshim)
[![License](https://img.shields.io/npm/l/indexeddbshim.svg)](LICENSE-MIT.txt)

Version 4.0.0 of IndexedDBShim uses a later version of typeson-registry's
Structured Cloning Algorithm serialization/parsing format by default.

This small utility allows IndexedDBShim databases created under version
3.0.0 (and thus the earlier typeson-registry format) to be used with
version 4.0.0 of IndexedDBShim.

You must set config early, e.g., within the call to `setGlobalVars` in
the non-invasive distribution of IndexedDBShim.

```js
setGlobalVars(null, {
    registerSCA: typesonRegistrySCAReverter
});
```

Or you may set the config before any indexedDB calls:

```js
shimIndexedDB.__setConfig({
    registerSCA: typesonRegistrySCAReverter
});
// Safe to use indexedDB now...
```
