import { html, LitElement } from 'lit';
import { Router } from '@lit-labs/router';

class AppShell extends LitElement {
  #router = new Router(this, [
    {
      path: '/',
      enter: () => {
        window.location.href = '/people/';
      },
    },
    {
      path: '/people/*',
      render: () => html`<person-router />`,
      enter: () => import('person-mfe/person-router.js'),
    },
    {
      path: '/groups/*',
      render: () => html`<group-router />`,
      enter: () => import('group-mfe/group-router.js'),
    },
  ]);

  render() {
    return this.#router.outlet();
  }
}

customElements.define('app-shell', AppShell);
