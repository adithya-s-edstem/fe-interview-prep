export function fakeScrollTo(...position: [ScrollToOptions?] | [number, number]): void {
  const [optionsOrLeft, top] = position;
  const scrollY = typeof optionsOrLeft === 'number' ? top : optionsOrLeft?.top;
  Object.defineProperty(window, 'scrollY', { value: scrollY ?? 0, configurable: true, writable: true });
}
