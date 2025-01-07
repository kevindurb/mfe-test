import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';

class PersonRouter extends LitElement {
  #routes = new Routes(this, [
    {
      path: '',
      render: () => html`<person-list></person-list>`,
      enter: () => import('./person-list.js') && true,
    },
    {
      path: ':personId',
      render: ({ personId }) =>
        html`<person-detail personId=${personId}></person-detail>`,
      enter: () => import('./person-detail.js') && true,
    },
  ]);

  render() {
    return html`
      <h1>People</h1>
      ${this.#routes.outlet()}
    `;
  }
}

customElements.define('person-router', PersonRouter);
