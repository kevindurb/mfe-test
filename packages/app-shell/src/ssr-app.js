import { css, html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

class SSRApp extends LitElement {
  /** @type {ReturnType<typeof createRef<HTMLIFrameElement>>} */
  #iframe = createRef();
  styles = css`
    iframe {
      border-width: 0;
    }
  `;

  #onIFrameLoad() {
    const scrollHeight =
      this.#iframe.value?.contentWindow.document.body.scrollHeight;
    if (!scrollHeight) return;

    this.style.height = `${scrollHeight}px`;
  }

  render() {
    return html`<iframe ${ref(this.#iframe)} src="http://localhost:3004" />`;
  }
}

customElements.define('ssr-app', SSRApp);
