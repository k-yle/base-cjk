# BaseCJK

[![Build Status](https://github.com/k-yle/base-cjk/workflows/CI/badge.svg)](https://github.com/k-yle/base-cjk/actions)
[![npm version](https://badge.fury.io/js/base-cjk.svg)](https://npm.im/base-cjk)
[![npm](https://img.shields.io/npm/dt/base-cjk.svg)](https://npm.im/base-cjk)
![npm bundle size](https://deno.bundlejs.com/?q=base-cjk&badge=)

Similar to [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) and [base45](https://datatracker.ietf.org/doc/html/rfc9285), _BaseCJK_ encodes a string into [CJK characters](https://en.wikipedia.org/wiki/CJK_characters).

Since there are over 64² CJK characters, we can combine two ASCII characters into a single CJK character.
This transformation is performed after first converting the string to base64 in a unicode-safe way.

For example, `H` becomes `SA` in base64, which becomes `劒` in BaseCJK. Likewise for `Hi → SGk → 劘坤`.
The generated CJK characters are usually nonsensical in every language.

Although BaseCJK appears to produce a shorter string then Base64, **it is not an efficient data format**, and there are vanishingly few situations where this is useful.

### Usage

```js
import { encode, decode } from 'base-cjk';

encode('hola😆'); // -> '咠嶩吷亡垮员'

decode('咠嶩吷亡垮员'); // -> 'hola😆'
```

### Magic Number

BaseCJK has no header or magic numbers to detect the encoding.
However, BaseCJK-encoded JSON will typically start with `嗐偈…`, similar to Base64's [distinctive `ey…` prefix](https://stackoverflow.com/a/49519717).
