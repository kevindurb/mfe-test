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
      enter: () => import('@mfe-test/person-mfe/person-router.js') && true,
    },
    redirect('/groups', '/groups/'),
    {
      path: '/groups/*',
      render: () => html`<group-router></group-router>`,
      enter: () => import('@mfe-test/group-mfe/group-router.js') && true,
    },
    redirect('/ssr', '/ssr/'),
    {
      path: '/ssr/*',
      render: () => html`<ssr-app></ssr-app>`,
      enter: () => import('./ssr-app.js') && true,
    },
  ]);

  render() {
    return this.#router.outlet();
  }
}

customElements.define('app-router', AppRouter);
