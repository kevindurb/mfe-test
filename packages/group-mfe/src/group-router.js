import { html, LitElement } from 'lit';
import { Routes } from '@lit-labs/router';

class GroupRouter extends LitElement {
  #routes = new Routes(this, [
    {
      path: '',
      render: () => html`<group-list></group-list>`,
      enter: () => import('./group-list.js'),
    },
    {
      path: ':groupId',
      render: ({ groupId }) =>
        html`<group-detail groupId=${groupId}></group-detail>`,
      enter: () => import('./group-detail.js'),
    },
  ]);

  render() {
    return html`
      <h1>Groups</h1>
      ${this.#routes.outlet()}
    `;
  }
}

customElements.define('group-router', GroupRouter);
