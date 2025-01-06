import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { client, gql } from './graphql.js';
import { ContextConsumer } from '@lit/context';
import { routesContext } from './routes-context.js';
import { Routes } from '@lit-labs/router';

const peopleListQuery = gql`
  query {
    people {
      id
      name
    }
  }
`;

class PeopleList extends LitElement {
  #peopleListTask = new Task(this, {
    task: () => client.request(peopleListQuery),
    args: () => [],
  });

  #routesContext = new ContextConsumer(this, { context: routesContext });

  renderPeopleList(people = []) {
    /** @type {Routes} */
    const routes = this.#routesContext.value;

    return html`
      <ul>
        ${people.map(
          (person) => html`
            <li>
              <a href=${routes.link(person.id)}>${person.name}</a>
            </li>
          `,
        )}
      </ul>
    `;
  }

  render() {
    return this.#peopleListTask.render({
      complete: ({ people }) => this.renderPeopleList(people),
    });
  }
}

customElements.define('people-list', PeopleList);
