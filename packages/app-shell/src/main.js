if (!globalThis.URLPattern) {
  await import("urlpattern-polyfill");
}
await import('./app-shell.js')
