import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';
import { ContextProvider } from '@lit/context';
import { routesContext } from './routes-context.js';

class PersonMFE extends LitElement {
  #routes = new Routes(this, [
    {
      path: '',
      render: () => html`<people-list />`,
      enter: () => import('./people-list.js'),
    },
    {
      path: ':id',
      render: () => html`<person-detail />`,
      enter: () => import('./person-detail.js'),
    },
  ]);

  #routesProvider = new ContextProvider(this, {
    context: routesContext,
    initialValue: this.#routes,
  });

  render() {
    return html`
      <h1>People</h1>
      ${this.#routes.outlet()}
    `;
  }
}

customElements.define('person-mfe', PersonMFE);
