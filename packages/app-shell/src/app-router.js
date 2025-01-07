import { html, LitElement } from 'lit';
import { Router } from '@lit-labs/router';
import { redirect } from './utils.js';

class AppRouter extends LitElement {
  #router = new Router(this, [
    redirect('/', '/people/'),
    redirect('/people', '/people/'),
    {
      path: '/people/*',
      render: () => html`<person-router></person-router>`,
      enter: () => import('person-mfe/person-router.js'),
    },
    redirect('/groups', '/groups/'),
    {
      path: '/groups/*',
      render: () => html`<group-router></group-router>`,
      enter: () => import('group-mfe/group-router.js'),
    },
  ]);

  render() {
    return this.#router.outlet();
  }
}

customElements.define('app-router', AppRouter);
