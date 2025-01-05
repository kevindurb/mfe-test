import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';

class AppShell extends LitElement {
  #routes = new Routes(this, [
    { path: '/people/*', render: () => html`<people-mfe/>`, enter: () => import('person-mfe') },
    { path: '/groups/*', render: () => html`<groups-mfe/>`, enter: () => import('group-mfe') },
  ]);

  render() {
    return html`${this.#routes.outlet()}`;
  }
}

customElements.define('app-shell', AppShell);
