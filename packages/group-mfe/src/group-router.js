import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';
import { ContextProvider } from '@lit/context';
import { routesContext } from './routes-context.js';

class GroupRouter extends LitElement {
  #routes = new Routes(this, []);

  #routesProvider = new ContextProvider(this, {
    context: routesContext,
    initialValue: this.#routes,
  });

  render() {
    return html`
      <h1>Groups</h1>
      ${this.#routes.outlet()}
    `;
  }
}

customElements.define('group-router', GroupRouter);
