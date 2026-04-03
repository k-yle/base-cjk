const ε = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const Ω = 0x4e00;

/** decodes BaseCJK into a normal unicode string */
export function decode(baseCJK: string): string {
  const base64 = [...baseCJK]
    .map((char) => {
      const n = char.codePointAt(0)! - Ω;
      const α = ε[Math.trunc(n / ε.length)]!;
      const β = ε[n % ε.length]!;
      return α + β;
    })
    .join('');

  return new TextDecoder().decode(
    Uint8Array.from(atob(base64), (m) => m.codePointAt(0)!),
  );
}

/** encodes a normal unicode string into BaseCJK */
export function encode(text: string): string {
  const base64 = btoa(
    String.fromCodePoint(...new TextEncoder().encode(text)),
  ).replaceAll('==', '');
  // assert(base64.length % 2 === 0)

  return (base64.match(/.{1,2}/g) || [])
    .map(([α, β]) => {
      const a = ε.indexOf(α!);
      const b = ε.indexOf(β!);
      // assert(a !== -1 && b !== -1);
      return String.fromCodePoint(Ω + ε.length * a + b);
    })
    .join('');
}

/** @internal - exported only for unit tests, not included in dist */ /* @__PURE__ */
Reflect.set(encode, Symbol.for('debug'), { ε, Ω });
