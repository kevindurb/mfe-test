import { html, LitElement } from 'lit';
import { Router } from '@lit-labs/router';

class AppShell extends LitElement {
  #router = new Router(this, [
    {
      path: '/',
      enter: () => {
        window.location.href = '/people';
      },
    },
    {
      path: '/people*',
      render: () => html`<people-mfe />`,
      enter: () => import('person-mfe'),
    },
    {
      path: '/groups*',
      render: () => html`<groups-mfe />`,
      enter: () => import('group-mfe'),
    },
  ]);

  render() {
    return html`${this.#router.outlet()}`;
  }
}

customElements.define('app-shell', AppShell);
