import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';

class AppShell extends LitElement {
  #routes = new Routes(this, [
    { path: '/people/*', render: () => html`<people-mfe/>`, enter: () => import('people-mfe') },
    { path: '/groups/*', render: () => html`<groups-mfe/>`, enter: () => import('groups-mfe') },
  ]);

  render() {
    return this.#routes.outlet();
  }
}

customElements.define('app-shell', AppShell);
