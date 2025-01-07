import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { gql } from 'graphql-tag';
import { client } from '@mfe-test/common/client.js';

const personListQuery = gql`
  query {
    people {
      id
      name
    }
  }
`;

class PersonList extends LitElement {
  #personListTask = new Task(this, {
    task: (_, { signal }) => client.request(personListQuery, {}, { signal }),
    args: () => [],
  });

  /**
   * @param {{id: number, name: string}[]} people
   */
  renderPersonList(people = []) {
    return html`
      <ul>
        ${people.map(
          (person) => html`
            <li>
              <a href="/people/${person.id}">${person.name}</a>
            </li>
          `,
        )}
      </ul>
    `;
  }

  render() {
    return this.#personListTask.render({
      complete: ({ people }) => this.renderPersonList(people),
    });
  }
}

customElements.define('person-list', PersonList);
